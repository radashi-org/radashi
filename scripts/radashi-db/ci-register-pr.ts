import type { Octokit } from '@octokit/rest'
import { registerPullRequest } from './src/register-pr'

export async function run(
  context: Context,
  github: Octokit,
  console?: Pick<Console, 'log' | 'error'>,
): Promise<void> {
  // https://docs.github.com/en/webhooks/webhook-events-and-payloads?actionType=synchronize#pull_request
  const pr = context.payload.pull_request
  if (!pr) {
    throw new Error('No pull request found in context')
  }

  const owner = pr.head.repo.owner.login
  const repo = pr.head.repo.name

  const { data: files } = await github.pulls.listFiles({
    owner,
    repo,
    pull_number: pr.number,
  })
  const { data: checkRuns } = await github.checks.listForRef({
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
      const { data: reactions } = await github.reactions.listForIssue({
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
      const { data } = await github.repos.getContent({
        owner,
        repo,
        path,
        ref: pr.head.sha,
      })
      if (!('content' in data)) {
        throw new Error(`File ${path} has no content`)
      }
      return Buffer.from(data.content, 'base64').toString('utf-8')
    },
    getIssueBody: async () => {
      return pr.body ?? null
    },
  })
}

/**
 * @source https://github.com/actions/toolkit/blob/f003268/packages/github/src/context.ts
 */
interface Context {
  payload: WebhookPayload
  eventName: string
  sha: string
  ref: string
  workflow: string
  action: string
  actor: string
  job: string
  runAttempt: number
  runNumber: number
  runId: number
  apiUrl: string
  serverUrl: string
  graphqlUrl: string
}

interface PayloadRepository {
  [key: string]: any
  full_name?: string
  name: string
  owner: {
    [key: string]: any
    login: string
    name?: string
  }
  html_url?: string
}

interface WebhookPayload {
  [key: string]: any
  repository?: PayloadRepository
  issue?: {
    [key: string]: any
    number: number
    html_url?: string
    body?: string
  }
  pull_request?: {
    [key: string]: any
    number: number
    html_url?: string
    body?: string
  }
  sender?: {
    [key: string]: any
    type: string
  }
  action?: string
  installation?: {
    id: number
    [key: string]: any
  }
  comment?: {
    id: number
    [key: string]: any
  }
}
