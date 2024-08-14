import { Octokit } from '@octokit/rest'
import mri from 'mri'
import { benchAddedFiles } from './src/benchAddedFiles.js'
import { benchChangedFiles } from './src/benchChangedFiles.js'

const octokit = new Octokit({
  auth: process.env.RADASHI_BOT_TOKEN,
})

main()

async function main() {
  const { baseRef, prNumber } = parseArgv(process.argv.slice(2))

  // Run the benchmarks
  const addedBenchmarks = await benchAddedFiles()
  const changedBenchmarks = await benchChangedFiles(baseRef)

  console.log('Added', addedBenchmarks)
  console.log('Changed', changedBenchmarks)

  if (addedBenchmarks.length === 0 && changedBenchmarks.length === 0) {
    console.log('No benchmarks were found')
    return
  }

  const columnNames = ['Name', 'Current']
  if (changedBenchmarks.some(b => b.baseline)) {
    columnNames.push('Baseline', 'Change')
  }

  // Create the comment body
  let commentBody = '## Benchmark Results\n\n'
  commentBody += `| ${columnNames.join(' | ')} |\n`
  commentBody += `| ${columnNames.map(name => '-'.repeat(name.length)).join(' | ')} |\n`

  for (const { result, baseline } of changedBenchmarks) {
    if (!baseline) {
      addedBenchmarks.push(result)
      continue
    }

    const change = ((result.hz - baseline.hz) / baseline.hz) * 100
    const columns = [
      `${result.func}: ${result.name}`,
      `${formatNumber(result.hz)} ops/sec ±${formatNumber(result.rme)}%`,
      `${formatNumber(baseline.hz)} ops/sec ±${formatNumber(baseline.rme)}%`,
      formatChange(change),
    ]

    commentBody += `| ${columns.join(' | ')} |\n`
  }

  for (const result of addedBenchmarks) {
    const columns = [
      `${result.func}: ${result.name}`,
      `${formatNumber(result.hz)} ops/sec ±${formatNumber(result.rme)}%`,
    ]

    if (columnNames.length > 2) {
      columns.push('', '')
    }

    commentBody += `| ${columns.join(' | ')} |\n`
  }

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

    if (existingCommentIndex === comments.length - 1) {
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

function formatNumber(n: number) {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(n)
}

function formatChange(change: number) {
  return `${change >= 0 ? '🚀' : '🐢'} ${change >= 0 ? '+' : ''}${formatNumber(change)}%`
}

function parseArgv(argv: string[]) {
  if (!process.env.SUPABASE_KEY) {
    throw new Error('SUPABASE_KEY is not set')
  }
  if (!process.env.RADASHI_BOT_TOKEN) {
    throw new Error('RADASHI_BOT_TOKEN is not set')
  }

  // Prevent access to secrets from the benchmarks.
  process.env.SUPABASE_KEY = ''
  process.env.RADASHI_BOT_TOKEN = ''

  const {
    _: [baseRef, prNumber],
  } = mri(argv)

  if (!baseRef || Number.isNaN(+prNumber)) {
    throw new Error('Invalid arguments')
  }

  return {
    baseRef,
    prNumber: +prNumber,
  }
}
