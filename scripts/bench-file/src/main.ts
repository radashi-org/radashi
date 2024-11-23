import {
  type BenchmarkReport,
  reportToBenchmarkHandler,
} from '@radashi-org/benchmarks/reporter.ts'
import { createVitest } from 'vitest/node'

main()

async function main() {
  const reports: BenchmarkReport[] = []

  const vitest = await createVitest('benchmark', {
    watch: false,
    pool: 'vmThreads',
    includeTaskLocation: true,
    config: new URL('../vitest.config.ts', import.meta.url).pathname,
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
