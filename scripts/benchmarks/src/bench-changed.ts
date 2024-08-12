/**
 * This script checks which functions have been modified and runs the
 * benchmarks for them.
 */
import { existsSync } from 'node:fs'
import { createVitest } from 'vitest/node'
import { supabase } from '../../radashi-db/supabase.js'
import { getChangedFiles } from './get-changed.js'
import { type Benchmark, reportToBenchmarkHandler } from './reporter.js'

/**
 * Given a target branch, run the benchmarks for any source files that have
 * been modified. It returns the results of the benchmarks.
 */
export async function benchChangedFiles(targetBranch: string) {
  const files = await getChangedFiles(targetBranch, ['src/**/*.ts'])

  const results: { result: Benchmark; baseline: Benchmark | null }[] = []

  const vitest = await createVitest('benchmark', {
    benchmark: {
      reporters: [
        reportToBenchmarkHandler(async result => {
          const { data: baseline } = await supabase
            .from('benchmarks')
            .select('*')
            .eq('func', result.func)
            .eq('name', result.name)
            .order('created_at', { ascending: false })
            .limit(1)
            .single()

          results.push({ result, baseline })
        }),
      ],
    },
  })

  for (const file of files) {
    // Only run benchmarks for modified source files in a function group.
    if (file.status !== 'M' || !/^src\/.+?\//.test(file.name)) {
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
