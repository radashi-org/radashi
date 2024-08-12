/**
 * This script checks which functions have been modified and runs the
 * benchmarks for them.
 */
import { existsSync } from 'node:fs'
import { supabase } from 'radashi-db/supabase.js'
import { getChangedFiles } from './get-changed.js'
import type { Benchmark } from './reporter.js'
import { runVitest } from './runner.js'

/**
 * Given a target branch, run the benchmarks for any source files that have
 * been modified. It returns the results of the benchmarks.
 */
export async function benchChangedFiles(targetBranch: string) {
  const files = await getChangedFiles(targetBranch, ['src/**/*.ts'])

  const benchmarks: { result: Benchmark; baseline: Benchmark | null }[] = []

  for (const file of files) {
    // Only run benchmarks for modified source files in a function group.
    if (file.status !== 'M' || !/^src\/.+?\//.test(file.name)) {
      continue
    }

    const benchFile = file.name
      .replace('src', 'benchmarks')
      .replace(/\.ts$/, '.bench.ts')

    if (existsSync(benchFile)) {
      const results = await runVitest(benchFile)
      for (const result of results) {
        const { data: baseline } = await supabase
          .from('benchmarks')
          .select('*')
          .eq('func', result.func)
          .eq('name', result.name)
          .order('created_at', { ascending: false })
          .limit(1)
          .single()

        benchmarks.push({
          result,
          baseline,
        })
      }
    }
  }

  return benchmarks
}
