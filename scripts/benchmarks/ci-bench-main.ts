import { execa } from 'execa'
import { existsSync } from 'node:fs'
import { supabase } from 'radashi-db/supabase.js'
import { getChangedFiles } from './src/get-changed.js'
import { injectBaseline } from './src/inject-baseline.js'
import type { Benchmark } from './src/reporter.js'
import { runVitest } from './src/runner.js'

main()

async function main() {
  if (!process.env.SUPABASE_KEY) {
    throw new Error('SUPABASE_KEY is not set')
  }

  // Get the last benched SHA
  const metaResult = await supabase
    .from('meta')
    .select('value')
    .eq('id', 'last_benched_sha')
    .limit(1)
    .single()

  if (metaResult.error) {
    console.error('Error fetching last benched SHA:', metaResult.error)
    return
  }

  const lastBenchedSha = metaResult.data.value as string
  const currentSha = await execa('git', ['rev-parse', 'HEAD']).then(
    result => result.stdout,
  )

  if (lastBenchedSha === currentSha) {
    console.log('No changes since last benched SHA')
    return
  }

  const benchmarks: Benchmark[] = []

  const files = await getChangedFiles(lastBenchedSha, ['src/**/*.ts'])

  for (const file of files) {
    // Run benchmarks for modified or added source files in a function group
    if (
      (file.status === 'M' || file.status === 'A') &&
      /^src\/.+?\//.test(file.name)
    ) {
      const benchFile = file.name
        .replace('src', 'benchmarks')
        .replace(/\.ts$/, '.bench.ts')

      if (existsSync(benchFile)) {
        if (file.status === 'M') {
          await injectBaseline(lastBenchedSha, file.name, benchFile)
        }
        await runVitest(benchFile)
      }
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
    .update({ value: currentSha })
    .eq('id', 'last_benched_sha')

  if (updateError) {
    updateError.message =
      'Error updating last benched SHA: ' + updateError.message
    throw updateError
  }
}
