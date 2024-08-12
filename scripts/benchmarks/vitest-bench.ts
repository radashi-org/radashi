/**
 * This script exists to avoid out-of-memory issues when running more
 * than only a couple benchmarks in CI. Ideally, we wouldn't need it.
 */
import mri from 'mri'
import { createVitest } from 'vitest/node'
import { type Benchmark, reportToBenchmarkHandler } from './src/reporter.js'

main()

async function main() {
  const results: Benchmark[] = []

  const vitest = await createVitest('benchmark', {
    watch: false,
    benchmark: {
      reporters: [
        reportToBenchmarkHandler(benchmark => {
          results.push(benchmark)
        }),
      ],
    },
  })

  const [file] = mri(process.argv.slice(2))._
  await vitest.start([file])

  console.log(JSON.stringify(results))
}
