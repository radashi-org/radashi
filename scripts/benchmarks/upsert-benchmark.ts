/**
 * This script exists to avoid out-of-memory issues when running more
 * than only a couple benchmarks in CI. Ideally, we wouldn't need it.
 */
import mri from 'mri'
import { supabase } from 'radashi-db/supabase.js'
import { createVitest } from 'vitest/node'
import { type Benchmark, reportToBenchmarkHandler } from './src/reporter.js'

main()

async function main() {
  const { file, sha } = mri(process.argv.slice(2)) as {
    file: string
    sha: string
  }

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

  await vitest.start([file])

  const { error: upsertError } = await supabase.from('benchmarks').upsert(
    results.map(result => ({
      ...result,
      sha,
    })),
  )

  if (upsertError) {
    upsertError.message =
      'Error upserting benchmark results: ' + upsertError.message
    throw upsertError
  }
}
