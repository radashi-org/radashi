/**
 * This script checks which functions have been added and runs the
 * benchmarks for them.
 */
import { existsSync } from 'node:fs'
import { getStagedFiles } from './getStagedFiles.js'
import type { BenchmarkReport } from './reporter.js'
import { runVitest } from './runner.js'

/**
 * Given a target branch, run the benchmarks for any source files that have
 * been modified. It returns the results of the benchmarks.
 */
export async function benchAddedFiles() {
  const files = await getStagedFiles(['src/**/*.ts'])

  const reports: BenchmarkReport[] = []

  for (const file of files) {
    // Only run benchmarks for added source files in a function group.
    if (file.status !== 'A' || !/^src\/.+?\//.test(file.name)) {
      continue
    }

    const benchFile = file.name
      .replace('src', 'benchmarks')
      .replace(/\.ts$/, '.bench.ts')

    if (existsSync(benchFile)) {
      reports.push(...(await runVitest(benchFile)))
    }
  }

  return reports
}
