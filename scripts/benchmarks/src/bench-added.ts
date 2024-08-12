/**
 * This script checks which functions have been added and runs the
 * benchmarks for them.
 */
import { existsSync } from 'node:fs'
import { createVitest } from 'vitest/node'
import { getChangedFiles } from './get-changed.js'
import { type Benchmark, reportToBenchmarkHandler } from './reporter.js'

/**
 * Given a target branch, run the benchmarks for any source files that have
 * been modified. It returns the results of the benchmarks.
 */
export async function benchAddedFiles(targetBranch: string) {
  const files = await getChangedFiles(targetBranch, ['src/**/*.ts'])

  const results: Benchmark[] = []

  const vitest = await createVitest('benchmark', {
    benchmark: {
      reporters: [
        reportToBenchmarkHandler(benchmark => {
          results.push(benchmark)
        }),
      ],
    },
  })

  for (const file of files) {
    // Only run benchmarks for added source files in a function group.
    if (file.status !== 'A' || !/^src\/.+?\//.test(file.name)) {
      continue
    }

    const benchFile = file.name
      .replace('src', 'benchmarks')
      .replace(/\.ts$/, '.bench.ts')

    if (existsSync(benchFile)) {
      console.log(`Running benchmarks in ./${benchFile}`)
      await vitest.start([benchFile])
    }
  }

  return results
}
