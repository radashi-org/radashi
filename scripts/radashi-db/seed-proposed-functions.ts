import { Octokit } from '@octokit/rest'
import { registerPullRequest } from './register-pr'

async function seedProposedFunctions() {
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  })

  try {
    console.log('Listing PRs for radashi-org/radashi')
    const { data: pullRequests } = await octokit.pulls.list({
      owner: 'radashi-org',
      repo: 'radashi',
      state: 'all',
    })

    console.log(`Found ${pullRequests.length} PRs`)
    console.log('Example PR:', pullRequests[0])

    for (const pr of pullRequests) {
      console.log(`Processing PR ${pr.number}`)
      console.log('Listing files')
      const { data: files } = await octokit.pulls.listFiles({
        owner: 'radashi-org',
        repo: 'radashi',
        pull_number: pr.number,
      })

      console.log(
        'Example file:',
        files.find(
          file =>
            file.status === 'added' &&
            file.filename.startsWith('src') &&
            file.filename.endsWith('.ts'),
        ) || files[0],
      )

      await registerPullRequest(pr.number, {
        sha: pr.head.sha,
        files,
        read: async path => {
          console.log(`Reading file ${path}`)
          const { data } = await octokit.repos.getContent({
            owner: 'radashi-org',
            repo: 'radashi',
            path,
            ref: pr.head.sha,
          })
          if (!('content' in data)) {
            throw new Error(`File ${path} has no content`)
          }
          return Buffer.from(data.content, 'base64').toString('utf-8')
        },
        body: async () => {
          const { data } = await octokit.issues.get({
            owner: 'radashi-org',
            repo: 'radashi',
            issue_number: pr.number,
          })
          return data.body
        },
        thumbs: async () => {
          console.log('Listing reactions')
          const { data: reactions } = await octokit.reactions.listForIssue({
            owner: 'radashi-org',
            repo: 'radashi',
            issue_number: pr.number,
          })

          console.log('Example reaction:', reactions[0])

          return reactions.filter(reaction => reaction.content === '+1').length
        },
        status:
          pr.state === 'open'
            ? pr.draft
              ? 'draft'
              : 'open'
            : pr.merged_at != null
              ? 'merged'
              : 'closed',
      })
    }

    console.log('Radashi database seeded successfully')
  } catch (error) {
    console.error('Error seeding Radashi database:', error)
  }
}

seedProposedFunctions()
