import fs from 'node:fs/promises'
import { setTimeout } from 'node:timers/promises'
import { Octokit } from '@octokit/rest'
import { verifyEnvVars } from '@radashi-org/common/verifyEnvVars.ts'
import { getNewFunctions } from './new-functions.ts'

main().catch(() => {
  console.error(
    'PR registration failed. Check GitHub access and service configuration.',
  )
  process.exitCode = 1
})

async function main() {
  const { githubToken, eventPath, repository } = verifyEnvVars({
    githubToken: 'GITHUB_TOKEN',
    eventPath: 'GITHUB_EVENT_PATH',
    repository: 'GITHUB_REPOSITORY',
  })
  const event: PullRequestEvent = JSON.parse(
    await fs.readFile(eventPath, 'utf8'),
  )
  const [owner, repo] = repository.split('/')
  const octokit = new Octokit({
    auth: githubToken,
    baseUrl: process.env.GITHUB_API_URL,
  })
  const params = { owner, repo, pull_number: event.number }
  const matchesEvent = (pr: {
    head: { sha: string }
    base: { ref: string }
    state: string
    merged: boolean
  }) =>
    pr.head.sha === event.pull_request.head.sha &&
    pr.base.ref === event.pull_request.base.ref &&
    pr.state === event.pull_request.state &&
    pr.merged === Boolean(event.pull_request.merged_at)

  const { data: pr } = await octokit.pulls.get(params)
  if (!matchesEvent(pr)) {
    return
  }
  if (pr.changed_files > 3000) {
    throw new Error('The PR exceeds GitHub’s changed-file listing limit.')
  }
  const files = await octokit.paginate(octokit.pulls.listFiles, {
    ...params,
    per_page: 100,
  })
  const newFunctions = getNewFunctions(files)
  if (!newFunctions.length) {
    return
  }

  const listChecks = () =>
    octokit.paginate(octokit.checks.listForRef, {
      owner,
      repo,
      ref: pr.head.sha,
      per_page: 100,
    })

  if (process.argv[2] === 'check') {
    const allowedConclusions = [
      'success',
      'skipped',
      'failure',
      'timed_out',
      'cancelled',
    ]
    while (true) {
      const { data: currentPR } = await octokit.pulls.get(params)
      if (!matchesEvent(currentPR)) {
        return
      }
      const checks = (await listChecks()).filter(
        run => run.name !== 'register-pr',
      )
      if (checks.every(run => run.status === 'completed')) {
        if (
          checks.some(run => !allowedConclusions.includes(run.conclusion ?? ''))
        ) {
          throw new Error('A check completed with an unexpected conclusion.')
        }
        break
      }
      await setTimeout(10_000)
    }
    await fs.appendFile(process.env.GITHUB_OUTPUT!, 'has_new_func=true\n')
    return
  }

  const checkRuns = await listChecks()
  const docs = pr.merged
    ? new Map<string, string>()
    : await readDocumentation(
        octokit,
        { owner, repo },
        pr.head.sha,
        newFunctions.map(file =>
          file.filename.replace(/^src\//, 'docs/').replace(/\.ts$/, '.mdx'),
        ),
      )

  const { data: currentPR } = await octokit.pulls.get(params)
  if (!matchesEvent(currentPR) || currentPR.base.sha !== pr.base.sha) {
    return
  }

  console.log(`Registering PR #${pr.number}`)
  const { registerPullRequest } = await import('./register-pr.ts')
  await registerPullRequest(pr.number, {
    status: currentPR.draft
      ? 'draft'
      : currentPR.merged
        ? 'merged'
        : currentPR.state === 'open'
          ? 'open'
          : 'closed',
    sha: pr.head.sha,
    repo: currentPR.head.repo?.name,
    owner: currentPR.head.repo?.owner.login,
    ownerAvatarUrl: currentPR.user?.avatar_url,
    branch: currentPR.head.ref,
    checksPassed: checkRuns.every(
      run => run.conclusion === 'success' || run.name === 'register-pr',
    ),
    console: {
      log: message => console.log(JSON.stringify(message)),
      error: message => console.error(JSON.stringify(message)),
    },
    files,
    breaking: currentPR.labels.some(label => label.name === 'breaking'),
    getApprovalRating: async () => {
      const reactions = await octokit.paginate(octokit.reactions.listForIssue, {
        owner,
        repo,
        issue_number: pr.number,
        per_page: 100,
      })
      return reactions.filter(reaction => reaction.content === '+1').length
    },
    getCommit: async () => ({
      sha: pr.head.sha,
      author: currentPR.user?.login,
      date: currentPR.created_at,
    }),
    getFileContent: async path => {
      const content = docs.get(path)
      if (content === undefined) {
        throw new Error('No documentation blob for this function.')
      }
      return content
    },
    getIssueBody: async () => currentPR.body,
  })
}

async function readDocumentation(
  github: Octokit,
  repository: { owner: string; repo: string },
  commit: string,
  paths: string[],
) {
  const maxDocBytes = 256 * 1024
  const docs = new Map<string, string>()
  const { data } = await github.git.getCommit({
    ...repository,
    commit_sha: commit,
  })
  const trees = new Map<string, ReturnType<Octokit['git']['getTree']>>()
  for (const path of paths) {
    const parts = path.split('/')
    let treeSha = data.tree.sha
    for (const [i, name] of parts.entries()) {
      if (!trees.has(treeSha)) {
        trees.set(
          treeSha,
          github.git.getTree({ ...repository, tree_sha: treeSha }),
        )
      }
      const { data: tree } = await trees.get(treeSha)!
      if (tree.truncated) {
        throw new Error('GitHub returned a truncated documentation tree.')
      }

      const entry = tree.tree.find(file => file.path === name)
      if (!entry?.sha) {
        break
      }
      if (i < parts.length - 1) {
        if (entry.type !== 'tree' || entry.mode !== '040000') {
          break
        }
        treeSha = entry.sha
        continue
      }

      if (
        entry.type !== 'blob' ||
        (entry.mode !== '100644' && entry.mode !== '100755') ||
        entry.size === undefined ||
        entry.size > maxDocBytes
      ) {
        break
      }
      const { data: blob } = await github.git.getBlob({
        ...repository,
        file_sha: entry.sha,
      })
      if (
        blob.encoding !== 'base64' ||
        blob.size === null ||
        blob.size > maxDocBytes
      ) {
        throw new Error('Unexpected documentation blob format.')
      }
      docs.set(path, Buffer.from(blob.content, 'base64').toString('utf8'))
    }
  }
  return docs
}

interface PullRequestEvent {
  number: number
  pull_request: {
    head: { sha: string }
    base: { ref: string }
    state: string
    merged_at?: string | null
  }
}
