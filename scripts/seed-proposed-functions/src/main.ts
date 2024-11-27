import { Octokit, type RestEndpointMethodTypes } from '@octokit/rest'
import { registerPullRequest } from '@radashi-org/register-pr'
import { parallel } from 'radashi/async/parallel.ts'
import { bottleneck } from './util/bottleneck.ts'

async function seedProposedFunctions() {
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  })

  const limit = bottleneck(
    { interval: 1000 / 5 },
    async <T>(fn: () => Promise<T>) => fn(),
  )

  type ListPullsResponse = RestEndpointMethodTypes['pulls']['list']['response']
  type GetPullResponse = RestEndpointMethodTypes['pulls']['get']['response']

  type ListPullsResponseItem = ListPullsResponse['data'][number]
  type GetPullResponseData = GetPullResponse['data']
  type PullRequest = GetPullResponseData | ListPullsResponseItem
  type PullRequestRepo = Exclude<PullRequest['head']['repo'], null>

  async function onPullRequest(pr: {
    number: PullRequest['number']
    head: {
      sha: PullRequest['head']['sha']
      ref: PullRequest['head']['ref']
      repo: {
        owner: PullRequestRepo['owner']
        name: PullRequestRepo['name']
      } | null
    }
    title: PullRequest['title']
    state: PullRequest['state']
    draft?: PullRequest['draft']
    merged_at: PullRequest['merged_at']
    // mergeable: PullRequest['']
    user: PullRequest['user']
    labels: { name: string }[]
  }) {
    console.log(`Processing PR ${pr.number}`)

    const status =
      pr.state === 'open'
        ? pr.draft
          ? 'draft'
          : 'open'
        : pr.merged_at != null
          ? 'merged'
          : 'closed'

    const { data: files } = await limit(() =>
      octokit.pulls.listFiles({
        owner: 'radashi-org',
        repo: 'radashi',
        pull_number: pr.number,
      }),
    )

    const repoOwner = pr.head.repo?.owner
    const repoName = pr.head.repo?.name

    // Get the status of CI checks for the PR
    const { data: checkRuns } = await limit(() =>
      octokit.checks.listForRef({
        owner: 'radashi-org',
        repo: 'radashi',
        ref: pr.head.sha,
      }),
    )

    const checksPassed = checkRuns.check_runs.every(
      run => run.conclusion === 'success',
    )

    await registerPullRequest(pr.number, {
      sha: pr.head.sha,
      files,
      status,
      branch: pr.head.ref,
      owner: repoOwner?.login,
      ownerAvatarUrl: repoOwner?.avatar_url,
      repo: repoName,
      breaking: pr.labels.some(label => label.name === 'BREAKING CHANGE'),
      checksPassed,
      getApprovalRating: async () => {
        const { data: reactions } = await limit(() =>
          octokit.reactions.listForIssue({
            owner: 'radashi-org',
            repo: 'radashi',
            issue_number: pr.number,
          }),
        )

        return reactions.filter(reaction => reaction.content === '+1').length
      },
      getIssueBody: async () => {
        const { data } = await limit(() =>
          octokit.issues.get({
            owner: 'radashi-org',
            repo: 'radashi',
            issue_number: pr.number,
          }),
        )
        return data.body ?? null
      },
      getCommit: async (ref, owner = 'radashi-org', repo = 'radashi') => {
        const { data: commit } = await limit(() =>
          octokit.repos.getCommit({
            owner,
            repo,
            ref,
          }),
        )
        return {
          sha: commit.sha,
          date: commit.commit.author?.date,
          author: commit.commit.author?.name,
        }
      },
      getFileContent: async path => {
        const { data } = await limit(() =>
          octokit.repos.getContent({
            owner: 'radashi-org',
            repo: 'radashi',
            path,
            ref: pr.head.sha,
          }),
        )
        if (!('content' in data)) {
          throw new Error(`File ${path} has no content`)
        }
        return Buffer.from(data.content, 'base64').toString('utf-8')
      },
    })
  }

  try {
    for await (const response of octokit.paginate.iterator(
      octokit.rest.pulls.list,
      {
        owner: 'radashi-org',
        repo: 'radashi',
        state: 'open',
        per_page: 100,
      },
    )) {
      await parallel(3, response.data, onPullRequest)
    }

    for await (const response of octokit.paginate.iterator(
      octokit.rest.search.issuesAndPullRequests,
      {
        q: 'repo:radashi-org/radashi is:pr is:closed is:unmerged label:"open library" feat',
        per_page: 100,
      },
    )) {
      await parallel(3, response.data, async result => {
        if (!result.pull_request) {
          return
        }

        const { data: pr } = await limit(() =>
          octokit.pulls.get({
            owner: 'radashi-org',
            repo: 'radashi',
            pull_number: result.number,
          }),
        )

        onPullRequest(pr)
      })
    }

    console.log('Radashi database seeded successfully')
  } catch (error) {
    console.error('Error seeding Radashi database:', error)
  }
}

seedProposedFunctions()
