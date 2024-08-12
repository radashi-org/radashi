import { execa } from 'execa'
import glob from 'fast-glob'
import { existsSync } from 'node:fs'
import { supabase } from 'radashi-db/supabase.js'
import type { Benchmark } from './src/reporter'
import { runVitest } from './src/runner'

async function main() {
  if (!process.env.SUPABASE_KEY) {
    throw new Error('SUPABASE_KEY is not set')
  }

  const currentSha = await execa('git', ['rev-parse', 'HEAD']).then(
    result => result.stdout,
  )

  const benchmarks: Benchmark[] = []

  for (const file of await glob('src/**/*.ts')) {
    if (!/^src\/.+?\//.test(file)) {
      continue
    }

    const benchFile = file
      .replace('src', 'benchmarks')
      .replace(/\.ts$/, '.bench.ts')

    if (existsSync(benchFile)) {
      benchmarks.push(...(await runVitest(benchFile)))
    } else {
      console.log(`No benchmark found for ${file}`)
    }
  }

  console.log('Results', benchmarks)

  const { error: upsertError } = await supabase.from('benchmarks').upsert(
    benchmarks.map(result => ({
      ...result,
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

main().catch(console.error)
