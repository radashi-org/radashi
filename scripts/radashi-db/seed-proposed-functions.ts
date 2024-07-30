import { Octokit } from '@octokit/rest'
import { bottleneck } from './bottleneck'
import { registerPullRequest } from './register-pr'

async function seedProposedFunctions() {
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  })

  const limit = bottleneck(
    { interval: 1000 / 5 },
    async <T>(fn: () => Promise<T>) => fn(),
  )

  try {
    const { data: pullRequests } = await octokit.pulls.list({
      owner: 'radashi-org',
      repo: 'radashi',
      state: 'open',
    })

    console.log(`Found ${pullRequests.length} PRs`)

    for (const pr of pullRequests) {
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

      const { data: labels } = await limit(() =>
        octokit.issues.listLabelsOnIssue({
          owner: 'radashi-org',
          repo: 'radashi',
          issue_number: pr.number,
        }),
      )

      await registerPullRequest(pr.number, {
        sha: pr.head.sha,
        files,
        status,
        breaking: labels.some(label => label.name === 'BREAKING CHANGE'),
        thumbs: async () => {
          const { data: reactions } = await limit(() =>
            octokit.reactions.listForIssue({
              owner: 'radashi-org',
              repo: 'radashi',
              issue_number: pr.number,
            }),
          )

          return reactions.filter(reaction => reaction.content === '+1').length
        },
        body: async () => {
          const { data } = await limit(() =>
            octokit.issues.get({
              owner: 'radashi-org',
              repo: 'radashi',
              issue_number: pr.number,
            }),
          )
          return data.body ?? null
        },
        read: async path => {
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

    console.log('Radashi database seeded successfully')
  } catch (error) {
    console.error('Error seeding Radashi database:', error)
  }
}

seedProposedFunctions()
