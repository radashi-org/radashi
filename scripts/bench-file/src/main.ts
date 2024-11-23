import {
  type BenchmarkReport,
  reportToBenchmarkHandler,
} from '@radashi-org/benchmarks/reporter.ts'
import * as fs from 'node:fs'
import * as path from 'node:path'
import { createVitest } from 'vitest/node'

main()

async function main() {
  const reports: BenchmarkReport[] = []

  const rootDir = new URL('../../../', import.meta.url).pathname
  const scriptDir = new URL('../', import.meta.url).pathname
  const nodeModulesDir = path.join(rootDir, 'node_modules')

  // If the root node_modules directory doesn't contain vitest, link
  // it to the vitest installed for this script.
  fs.mkdirSync(nodeModulesDir, { recursive: true })
  try {
    fs.symlinkSync(
      path.relative(
        nodeModulesDir,
        path.join(scriptDir, 'node_modules/vitest'),
      ),
      path.join(nodeModulesDir, 'vitest'),
    )
  } catch (e) {
    console.warn(e)
  }

  const vitest = await createVitest('benchmark', {
    watch: false,
    pool: 'vmThreads',
    includeTaskLocation: true,
    config: path.join(rootDir, 'vitest.config.ts'),
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
