import { execa } from 'execa'
import glob from 'fast-glob'
import { existsSync } from 'node:fs'
import { supabase } from 'radashi-db/supabase.js'
import { createVitest } from 'vitest/node'
import { type Benchmark, reportToBenchmarkHandler } from './src/reporter.js'

async function main() {
  if (!process.env.SUPABASE_KEY) {
    throw new Error('SUPABASE_KEY is not set')
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

  for (const file of await glob('src/**/*.ts')) {
    if (!/^src\/.+?\//.test(file)) {
      continue
    }

    const benchFile = file
      .replace('src', 'benchmarks')
      .replace(/\.ts$/, '.bench.ts')

    if (existsSync(benchFile)) {
      console.log(`Running benchmarks in ./${benchFile}`)
      await vitest.start([benchFile])
    }
  }

  const { stdout: currentSha } = await execa('git', ['rev-parse', 'HEAD'])

  const { error: insertError } = await supabase.from('benchmarks').insert(
    results.map(result => ({
      ...result,
      sha: currentSha,
    })),
  )

  if (insertError) {
    insertError.message =
      'Error inserting benchmark results: ' + insertError.message
    throw insertError
  }

  const { error: updateError } = await supabase
    .from('meta')
    .upsert({ id: 'last_benched_sha', value: currentSha })
    .eq('id', 'last_benched_sha')

  if (updateError) {
    console.error('Error updating last benched SHA:', updateError)
  } else {
    console.log('Updated "last_benched_sha" in meta table')
  }

  console.log(
    `Seeded ${results.length} benchmark results for SHA: ${currentSha}`,
  )
}

main().catch(console.error)
