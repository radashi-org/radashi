import fs from 'node:fs/promises'
import { verifyEnvVars } from '@radashi-org/common/verifyEnvVars.ts'
import { weighChangedFunctions } from './weigh-changed.ts'

main().catch(error => {
  if (process.argv[2] === 'publish') {
    console.error('Could not update the PR description.')
  } else {
    console.error(
      JSON.stringify(error instanceof Error ? error.message : error),
    )
  }
  process.exitCode = 1
})

async function main() {
  const [command, resultPath] = process.argv.slice(2)
  if (command === 'measure' || command === 'publish') {
    const { eventPath, repository } = verifyEnvVars({
      eventPath: 'GITHUB_EVENT_PATH',
      repository: 'GITHUB_REPOSITORY',
    })
    const event: PullRequestEvent = JSON.parse(
      await fs.readFile(eventPath, 'utf8'),
    )

    if (command === 'measure') {
      const impact = await weighChangedFunctions({
        commits: {
          base: event.pull_request.base.sha,
          head: event.pull_request.head.sha,
        },
      })
      await fs.writeFile(resultPath, impact)
    } else {
      await updateBundleImpact(
        event,
        repository,
        await fs.readFile(resultPath, 'utf8'),
      )
    }
  } else {
    console.log(
      await weighChangedFunctions({ targetBranch: process.env.TARGET_BRANCH }),
    )
  }
}

async function updateBundleImpact(
  event: PullRequestEvent,
  repository: string,
  impact: string,
) {
  const { token } = verifyEnvVars({ token: 'GITHUB_TOKEN' })
  const { Octokit } = await import('@octokit/rest')
  const octokit = new Octokit({
    auth: token,
    baseUrl: process.env.GITHUB_API_URL,
  })
  const [owner, repo] = repository.split('/')
  const params = { owner, repo, pull_number: event.number }
  const { data: pr } = await octokit.pulls.get(params)
  if (
    pr.state !== 'open' ||
    pr.draft ||
    pr.head.sha !== event.pull_request.head.sha ||
    pr.base.ref !== event.pull_request.base.ref
  ) {
    return
  }

  const originalBody = pr.body ?? ''
  const impactSection = impact ? `## Bundle impact\n\n${impact}\n` : ''
  const existingSection =
    /^## Bundle impact[ \t]*\r?\n[\s\S]*?(?=^#{1,2}\s|(?![\s\S]))/m
  const updatedBody = existingSection.test(originalBody)
    ? originalBody.replace(existingSection, () => impactSection)
    : impactSection
      ? [originalBody, impactSection].filter(Boolean).join('\n\n')
      : originalBody

  if (updatedBody !== originalBody) {
    await octokit.pulls.update({ ...params, body: updatedBody })
  }
}

interface PullRequestEvent {
  number: number
  pull_request: {
    base: { ref: string; sha: string }
    head: { sha: string }
  }
}
