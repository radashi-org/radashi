/**
 * This script checks which functions have been modified and runs the
 * benchmarks for them.
 */
import { existsSync } from 'node:fs'
import { group } from 'radashi/array/group.js'
import { getChangedFiles } from './get-changed.js'
import { injectBaseline } from './inject-baseline.js'
import type { Benchmark } from './reporter.js'
import { runVitest } from './runner.js'

/**
 * Given a target branch, run the benchmarks for any source files that have
 * been modified. It returns the results of the benchmarks.
 */
export async function benchChangedFiles(
  targetBranch: string,
  files?: { status: string; name: string }[],
) {
  files ??= await getChangedFiles(targetBranch, ['src/**/*.ts'])

  const benchmarks: {
    result: Benchmark
    baseline: { hz: number; rme: number } | null
  }[] = []

  for (const file of files) {
    // Only run benchmarks for modified source files in a function group.
    if (file.status !== 'M' || !/^src\/.+?\//.test(file.name)) {
      continue
    }

    const benchFile = file.name
      .replace('src', 'benchmarks')
      .replace(/\.ts$/, '.bench.ts')

    if (existsSync(benchFile)) {
      await injectBaseline(targetBranch, file.name, benchFile)
      const results = group(
        await runVitest(benchFile),
        result => result.name,
      ) as {
        [key: string]: Benchmark[]
      }

      for (const [result, baseline] of Object.values(results)) {
        benchmarks.push({
          result,
          baseline,
        })
      }
    }
  }

  return benchmarks
}
