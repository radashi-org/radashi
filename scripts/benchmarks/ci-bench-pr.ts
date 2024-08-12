import { Octokit } from '@octokit/rest'
import mri from 'mri'
import { benchAddedFiles } from './src/bench-added.js'
import { benchChangedFiles } from './src/bench-changed.js'

const octokit = new Octokit({
  auth: process.env.RADASHI_BOT_TOKEN,
})

main()

async function main() {
  const { baseRef, prNumber } = parseArgv(process.argv.slice(2))

  // Run the benchmarks
  const addedBenchmarks = await benchAddedFiles(baseRef)
  const changedBenchmarks = await benchChangedFiles(baseRef)

  console.log('Added', addedBenchmarks)
  console.log('Changed', changedBenchmarks)

  const columnNames = ['Name', 'Current']
  if (changedBenchmarks.some(b => b.baseline)) {
    columnNames.push('Baseline', 'Change')
  }

  // Create the comment body
  let comment = '## Benchmark Results\n\n'
  comment += `| ${columnNames.join(' | ')} |\n`
  comment += `| ${columnNames.map(name => '-'.repeat(name.length)).join(' | ')} |\n`

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

    comment += `| ${columns.join(' | ')} |\n`
  }

  for (const result of addedBenchmarks) {
    const columns = [
      `${result.func}: ${result.name}`,
      `${formatNumber(result.hz)} ops/sec ±${formatNumber(result.rme)}%`,
    ]

    if (columnNames.length > 2) {
      columns.push('', '')
    }

    comment += `| ${columns.join(' | ')} |\n`
  }

  // Delete the previous benchmark comment if it exists
  try {
    const { data: comments } = await octokit.rest.issues.listComments({
      owner: 'radashi-org',
      repo: 'radashi',
      issue_number: prNumber,
      per_page: 100,
    })

    const benchmarkComment = comments.find(
      comment =>
        comment.body?.startsWith('## Benchmark Results') &&
        comment.user?.login === 'radashi-bot',
    )

    if (benchmarkComment) {
      await octokit.rest.issues.deleteComment({
        owner: 'radashi-org',
        repo: 'radashi',
        comment_id: benchmarkComment.id,
      })
      console.log('Successfully deleted previous benchmark comment.')
    }
  } catch (error) {
    console.error('Error deleting previous benchmark comment:', error)
  }

  // Create a comment in the PR with the benchmark results
  try {
    const { data: pullRequest } = await octokit.rest.pulls.get({
      owner: 'radashi-org',
      repo: 'radashi',
      pull_number: prNumber,
    })

    await octokit.rest.issues.createComment({
      owner: 'radashi-org',
      repo: 'radashi',
      issue_number: pullRequest.number,
      body: comment,
    })

    console.log('Successfully posted benchmark results as a comment.')
  } catch (error: any) {
    error.message = `Failed to create comment in PR: ${error.message}`
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
