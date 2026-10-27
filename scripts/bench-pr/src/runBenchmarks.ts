import fs from 'node:fs/promises'
import path from 'node:path'
import { benchAddedFiles } from '@radashi-org/benchmarks/benchAddedFiles.ts'
import { benchChangedFiles } from '@radashi-org/benchmarks/benchChangedFiles.ts'
import { execa } from 'execa'

export async function runBenchmarks(argv: string[]) {
  const { baseRef, prBlobURL } = parseArgv(argv)

  // Run the benchmarks
  const addedFiles = await benchAddedFiles()
  const changedFiles = await benchChangedFiles(baseRef)

  console.log('Added', addedFiles)
  console.log('Changed', changedFiles)

  if (addedFiles.length === 0 && changedFiles.length === 0) {
    console.log('No benchmarks were found')
    await writeBenchmarkOutput('')
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

  await writeBenchmarkOutput(commentBody)
}

function formatNumber(n: number) {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(n)
}

function formatChange(change: number) {
  return `${change >= 0 ? '🚀' : '🐢'} ${change >= 0 ? '+' : ''}${formatNumber(change)}%`
}

async function writeBenchmarkOutput(markdown: string) {
  const commentPath = process.env.BENCHMARK_COMMENT_PATH
  if (commentPath) {
    await fs.mkdir(path.dirname(commentPath), { recursive: true })
    await fs.writeFile(commentPath, markdown)
    console.log('Benchmark results written to', commentPath)
  }

  const summaryPath = process.env.GITHUB_STEP_SUMMARY
  if (!summaryPath) {
    if (markdown) {
      console.log(markdown)
    }
    return
  }

  if (markdown) {
    await fs.appendFile(summaryPath, markdown + '\n')
    console.log('Benchmark results written to job summary')
  }
}

function parseArgv(argv: string[]) {
  const [baseRef, prNumber, prBlobURL] = argv
  if (!baseRef || Number.isNaN(+prNumber) || !URL.canParse(prBlobURL)) {
    throw new Error(`Invalid arguments: ${argv.join(' ')}`)
  }

  return {
    baseRef,
    prBlobURL,
  }
}
