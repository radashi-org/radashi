import { Octokit } from '@octokit/rest'
import { benchAddedFiles } from '@radashi-org/benchmarks/benchAddedFiles.ts'
import { benchChangedFiles } from '@radashi-org/benchmarks/benchChangedFiles.ts'
import { verifyEnvVars } from '@radashi-org/common/verifyEnvVars.ts'
import { execa } from 'execa'

main()

async function main() {
  const { radashiBotToken } = verifyEnvVars({
    radashiBotToken: 'RADASHI_BOT_TOKEN',
  })

  const { baseRef, prNumber, prBlobURL } = parseArgv(process.argv.slice(2))

  // Run the benchmarks
  const addedFiles = await benchAddedFiles()
  const changedFiles = await benchChangedFiles(baseRef)

  console.log('Added', addedFiles)
  console.log('Changed', changedFiles)

  if (addedFiles.length === 0 && changedFiles.length === 0) {
    console.log('No benchmarks were found')
    return
  }

  const baseSHA = await execa('git', ['rev-parse', 'HEAD']).then(r => r.stdout)

  const columnNames = ['Name', 'Current']
  if (changedFiles.some(b => b.baseline)) {
    columnNames.push('Baseline', 'Change')
  }

  // Create the comment body
  let commentBody = '## Benchmark Results\n\n'
  commentBody += `| ${columnNames.join(' | ')} |\n`
  commentBody += `| ${columnNames.map(name => '-'.repeat(name.length)).join(' | ')} |\n`

  for (const report of changedFiles) {
    if (Number.isNaN(report.benchmark.hz)) {
      console.error('Invalid benchmark', report)
      continue
    }

    if (!report.baseline) {
      addedFiles.push(report)
      continue
    }

    const { file, location, benchmark, baseline } = report

    const benchBlobURL =
      `${prBlobURL}/${file}` + (location ? `#L${location.line}` : '')

    const srcFile = file
      .replace('benchmarks', 'src')
      .replace(/\.bench\.ts$/, '.ts')

    const change = ((benchmark.hz - baseline.hz) / baseline.hz) * 100
    const columns = [
      `[${benchmark.func} ▶︎ ${benchmark.name}](${benchBlobURL})`,
      `${formatNumber(benchmark.hz)} ops/sec ±${formatNumber(benchmark.rme)}%`,
      `${formatNumber(baseline.hz)} ops/sec ±${formatNumber(baseline.rme)}% [🔗](https://github.com/radashi-org/radashi/blob/${baseSHA}/${srcFile})`,
      formatChange(change),
    ]

    commentBody += `| ${columns.join(' | ')} |\n`
  }

  for (const report of addedFiles) {
    if (Number.isNaN(report.benchmark.hz)) {
      console.error('Invalid benchmark', report)
      continue
    }

    const { file, location, benchmark } = report
    const benchURL =
      `${prBlobURL}/${file}` + (location ? `#L${location.line}` : '')

    const columns = [
      `[${benchmark.func}: ${benchmark.name}](${benchURL})`,
      `${formatNumber(benchmark.hz)} ops/sec ±${formatNumber(benchmark.rme)}%`,
    ]

    if (columnNames.length > 2) {
      columns.push('', '')
    }

    commentBody += `| ${columns.join(' | ')} |\n`
  }

  commentBody +=
    "\n*Performance regressions of 30% or more should be investigated, unless they were anticipated. Smaller regressions may be due to normal variability, as we don't use dedicated CI infrastructure.*"

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

function formatNumber(n: number) {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(n)
}

function formatChange(change: number) {
  return `${change >= 0 ? '🚀' : '🐢'} ${change >= 0 ? '+' : ''}${formatNumber(change)}%`
}

function parseArgv(argv: string[]) {
  const [baseRef, prNumber, prBlobURL] = argv
  if (!baseRef || Number.isNaN(+prNumber) || !URL.canParse(prBlobURL)) {
    throw new Error(`Invalid arguments: ${argv.join(' ')}`)
  }

  return {
    baseRef,
    prNumber: +prNumber,
    prBlobURL,
  }
}
