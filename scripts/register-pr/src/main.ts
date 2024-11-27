import { Octokit } from '@octokit/rest'
import { verifyEnvVars } from '@radashi-org/common/verifyEnvVars.ts'
import fs from 'node:fs/promises'
import { registerPullRequest } from './register-pr.ts'

main()

async function main() {
  const { githubToken, prPayload } = verifyEnvVars({
    githubToken: 'GITHUB_TOKEN',
    prPayload: 'PULL_REQUEST',
  })

  const octokit = new Octokit({
    auth: githubToken,
  })

  const pr: PullRequest = JSON.parse(prPayload)
  const owner = pr.head.repo.owner.login
  const repo = pr.head.repo.name

  console.log('Registering PR in database', pr)

  const { data: files } = await octokit.pulls.listFiles({
    owner: 'radashi-org',
    repo: 'radashi',
    pull_number: pr.number,
  })
  const { data: checkRuns } = await octokit.checks.listForRef({
    owner: 'radashi-org',
    repo: 'radashi',
    ref: pr.head.sha,
  })

  console.log('Check runs', checkRuns)
  console.log('Files', files)

  await registerPullRequest(pr.number, {
    status: pr.draft ? 'draft' : pr.merged_at ? 'merged' : pr.state,
    sha: pr.head.sha,
    repo,
    owner,
    ownerAvatarUrl: pr.user.avatar_url,
    branch: pr.head.ref,
    checksPassed: checkRuns.check_runs.every(
      run => run.conclusion === 'success' || run.name === 'register-pr',
    ),
    console,
    files,
    breaking: pr.labels.some(label => label.name === 'breaking'),
    getApprovalRating: async () => {
      const { data: reactions } = await octokit.reactions.listForIssue({
        owner: 'radashi-org',
        repo: 'radashi',
        issue_number: pr.number,
      })
      return reactions.filter(reaction => reaction.content === '+1').length
    },
    getCommit: async () => {
      return {
        sha: pr.head.sha,
        author: pr.user.login,
        date: pr.created_at,
      }
    },
    getFileContent: async path => {
      return fs.readFile(path, 'utf-8')
    },
    getIssueBody: async () => {
      return pr.body
    },
  })
}

// https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=synchronize#pull_request
interface PullRequest {
  number: number
  draft: boolean
  merged_at: string | null
  state: 'open' | 'closed'
  created_at: string
  body: string | null
  labels: { name: string }[]
  user: {
    avatar_url: string
    login: string
  }
  head: {
    ref: string
    sha: string
    repo: {
      owner: {
        login: string
      }
      name: string
    }
  }
}
