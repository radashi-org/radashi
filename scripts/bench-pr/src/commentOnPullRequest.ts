import fs from 'node:fs/promises'
import { Octokit } from '@octokit/rest'

export async function commentOnPullRequest(argv: string[]) {
  const [prNumber, commentPath] = argv
  if (!prNumber || Number.isNaN(+prNumber) || !commentPath) {
    throw new Error('Expected arguments: comment <pr-number> <comment-path>')
  }

  const commentBody = await fs.readFile(commentPath, 'utf8')
  if (!commentBody.trim()) {
    console.log('No benchmark results were produced')
    return
  }

  const radashiBotToken = process.env.RADASHI_BOT_TOKEN
  if (!radashiBotToken) {
    throw new Error(
      'RADASHI_BOT_TOKEN is required to comment on benchmark results',
    )
  }

  await postBenchmarkComment({
    prNumber: +prNumber,
    commentBody,
    radashiBotToken,
  })
}

async function postBenchmarkComment({
  prNumber,
  commentBody,
  radashiBotToken,
}: {
  prNumber: number
  commentBody: string
  radashiBotToken: string
}) {
  const octokit = new Octokit({
    auth: radashiBotToken,
  })

  // Find and update the existing benchmark comment if it exists, or create a new one
  try {
    const { data: comments } = await octokit.rest.issues.listComments({
      owner: 'radashi-org',
      repo: 'radashi',
      issue_number: prNumber,
      per_page: 100,
    })

    const existingCommentIndex = comments.findIndex(
      comment =>
        comment.body?.startsWith('## Benchmark Results') &&
        comment.user?.login === 'radashi-bot',
    )

    if (
      existingCommentIndex !== -1 &&
      existingCommentIndex === comments.length - 1
    ) {
      const existingComment = comments[existingCommentIndex]
      await octokit.rest.issues.updateComment({
        owner: 'radashi-org',
        repo: 'radashi',
        comment_id: existingComment.id,
        body: commentBody,
      })
      console.log(
        'Successfully updated existing benchmark comment:',
        existingComment.html_url,
      )
    } else {
      // If the existing comment is not the last one, replace it with a new one.
      if (existingCommentIndex !== -1) {
        const existingComment = comments[existingCommentIndex]
        await octokit.rest.issues.deleteComment({
          owner: 'radashi-org',
          repo: 'radashi',
          comment_id: existingComment.id,
        })
      }

      const { data: newComment } = await octokit.rest.issues.createComment({
        owner: 'radashi-org',
        repo: 'radashi',
        issue_number: prNumber,
        body: commentBody,
      })
      console.log(
        'Successfully created new benchmark comment:',
        newComment.html_url,
      )
    }
  } catch (error: any) {
    error.message = `Failed to update or create comment in PR: ${error.message}`
    throw error
  }
}
