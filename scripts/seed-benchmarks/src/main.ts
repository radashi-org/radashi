import type { BenchmarkReport } from '@radashi-org/benchmarks/reporter.ts'
import { runVitest } from '@radashi-org/benchmarks/runner.ts'
import { execa } from 'execa'
import { existsSync } from 'node:fs'
import { supabase } from 'radashi-db/supabase.ts'
import { glob } from 'tinyglobby'

main()

async function main() {
  const currentSha = await execa('git', ['rev-parse', 'HEAD']).then(
    result => result.stdout,
  )

  const reports: BenchmarkReport[] = []

  for (const file of await glob('src/**/*.ts')) {
    if (!/^src\/.+?\//.test(file)) {
      continue
    }

    const benchFile = file
      .replace('src', 'benchmarks')
      .replace(/\.ts$/, '.bench.ts')

    if (existsSync(benchFile)) {
      reports.push(...(await runVitest(benchFile)))
    } else {
      console.log(`No benchmark found for ${file}`)
    }
  }

  console.log('Results', reports)

  const { error: upsertError } = await supabase.from('benchmarks').upsert(
    reports.map(result => ({
      ...result.benchmark,
      sha: currentSha,
    })),
  )

  if (upsertError) {
    upsertError.message =
      'Error upserting benchmark results: ' + upsertError.message
    throw upsertError
  }

  const { error: updateError } = await supabase
    .from('meta')
    .upsert({ id: 'last_benched_sha', value: currentSha })
    .eq('id', 'last_benched_sha')

  if (updateError) {
    console.error('Error updating last benched SHA:', updateError)
  }
}
