import type { Octokit } from '@octokit/rest'
import fs from 'node:fs/promises'
import { registerPullRequest } from './src/register-pr'

export async function run(pr: PullRequest, octokit: Octokit) {
  const owner = pr.head.repo.owner.login
  const repo = pr.head.repo.name

  const { data: files } = await octokit.pulls.listFiles({
    owner,
    repo,
    pull_number: pr.number,
  })
  const { data: checkRuns } = await octokit.checks.listForRef({
    owner,
    repo,
    ref: pr.head.sha,
  })

  await registerPullRequest(pr.number, {
    status: pr.draft ? 'draft' : pr.merged_at ? 'merged' : pr.state,
    sha: pr.head.sha,
    repo,
    owner,
    ownerAvatarUrl: pr.user.avatar_url,
    branch: pr.head.ref,
    checksPassed: checkRuns.check_runs.every(
      run => run.conclusion === 'success',
    ),
    console,
    files,
    breaking: (pr.labels as { name: string }[]).some(
      label => label.name === 'breaking',
    ),
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
        author: pr.user.name,
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
    name: string
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
