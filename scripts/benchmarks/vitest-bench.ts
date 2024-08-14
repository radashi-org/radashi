/**
 * This script exists to avoid out-of-memory issues when running more
 * than only a couple benchmarks in CI. Ideally, we wouldn't need it.
 */
import { createVitest } from 'vitest/node'
import {
  type BenchmarkReport,
  reportToBenchmarkHandler,
} from './src/reporter.js'

main()

async function main() {
  const reports: BenchmarkReport[] = []

  const vitest = await createVitest('benchmark', {
    watch: false,
    pool: 'vmThreads',
    includeTaskLocation: true,
    benchmark: {
      reporters: [
        reportToBenchmarkHandler(report => {
          reports.push(report)
        }),
      ],
    },
  })

  const [file] = process.argv.slice(2)
  await vitest.start([file])

  console.log(JSON.stringify(reports))
  process.exit(0)
}
