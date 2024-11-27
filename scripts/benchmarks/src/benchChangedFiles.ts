/**
 * This script checks which functions have been modified and runs the
 * benchmarks for them.
 */
import { existsSync } from 'node:fs'
import { group } from 'radashi/array/group.ts'
import { getStagedFiles } from './getStagedFiles.ts'
import type { BenchmarkReport } from './reporter.ts'
import { runVitest } from './runner.ts'

/**
 * Given a target branch, run the benchmarks for any source files that have
 * been modified. It returns the results of the benchmarks.
 */
export async function benchChangedFiles(
  targetBranch: string,
  files?: { status: string; name: string }[],
) {
  files ??= await getStagedFiles(['src/**/*.ts'])

  const reports: BenchmarkReport[] = []

  for (const file of files) {
    // Only run benchmarks for modified source files in a function group.
    if (file.status !== 'M' || !/^src\/.+?\//.test(file.name)) {
      continue
    }

    const benchFile = file.name
      .replace('src', 'benchmarks')
      .replace(/\.ts$/, '.bench.ts')

    if (existsSync(benchFile)) {
      const { compareToBaseline } = await import('./compareToBaseline.ts')

      const changed = await compareToBaseline(
        targetBranch,
        file.name,
        benchFile,
      )

      if (!changed) {
        console.log(
          'Skipping benchmarks for "%s". Minified bundle is unchanged when compared to baseline.',
          file.name,
        )
        continue
      }

      const reportPairs = group(
        await runVitest(benchFile),
        report => report.benchmark.name,
      ) as {
        [key: string]: BenchmarkReport[]
      }

      for (const [report, baseline] of Object.values(reportPairs)) {
        reports.push({
          ...report,
          baseline: baseline.benchmark,
        })
      }
    }
  }

  return reports
}
