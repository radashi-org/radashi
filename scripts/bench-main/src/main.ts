import { compareToBaseline } from '@radashi-org/benchmarks/compareToBaseline.ts'
import { getStagedFiles } from '@radashi-org/benchmarks/getStagedFiles.ts'
import type { BenchmarkReport } from '@radashi-org/benchmarks/reporter.ts'
import { runVitest } from '@radashi-org/benchmarks/runner.ts'
import { execa } from 'execa'
import { existsSync } from 'node:fs'
import { supabase } from 'radashi-db/supabase.ts'

main()

async function main() {
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

  const reports: BenchmarkReport[] = []

  const files = await getStagedFiles(['src/**/*.ts'], lastBenchedSha)

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
          const changed = await compareToBaseline(
            lastBenchedSha,
            file.name,
            benchFile,
          )
          if (!changed) {
            console.log(
              'Skipping benchmarks for "%s". Minified bundle is unchanged when compared to baseline.',
              file.name,
            )
            continue
          }
        }
        reports.push(...(await runVitest(benchFile)))
      }
    }
  }

  console.log('Results', reports)

  if (reports.length === 0) {
    console.log('No benchmarks were found')
    return
  }

  const { error: upsertError } = await supabase.from('benchmarks').upsert(
    reports.map(report => ({
      ...report.benchmark,
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
