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
      console.log('')
      console.log(`  pr.head.sha == ${pr.head.sha}`)
      console.log(`  pr.title == ${pr.title}`)
      console.log(`  pr.state == ${pr.state}`)
      console.log(`  pr.draft == ${pr.draft}`)
      console.log(`  pr.merged_at == ${pr.merged_at}`)
      console.log(`  pr.user.login == ${pr.user?.login}`)

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

      const { data: prDetails } = await limit(() =>
        octokit.pulls.get({
          owner: 'radashi-org',
          repo: 'radashi',
          pull_number: pr.number,
        }),
      )

      const repoOwner = prDetails.head.repo?.owner.login
      const repoName = prDetails.head.repo?.name
      console.log('repoOwner == %O', repoOwner)
      console.log('repoName == %O', repoName)

      await registerPullRequest(pr.number, {
        sha: pr.head.sha,
        files,
        status,
        owner: repoOwner,
        repo: repoName,
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
        getCommit: async (ref, owner = 'radashi-org', repo = 'radashi') => {
          const { data: commit } = await limit(() =>
            octokit.repos.getCommit({
              owner,
              repo,
              ref,
            }),
          )
          console.log('commit =>', {
            sha: commit.sha,
            date: commit.commit.author?.date,
            author: commit.commit.author?.name,
          })
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

    console.log('Radashi database seeded successfully')
  } catch (error) {
    console.error('Error seeding Radashi database:', error)
  }
}

seedProposedFunctions()
