import { execa } from 'execa'
import type { Benchmark } from './reporter'

const tsx = './scripts/benchmarks/node_modules/.bin/tsx'
const runner = './scripts/benchmarks/vitest-bench.ts'

export function runVitest(file: string) {
  console.log(`Running benchmarks in ./${file}`)

  // https://pythonspeed.com/articles/consistent-benchmarking-in-ci/
  return execa('valgrind', ['--tool=cachegrind', tsx, runner, file]).then(
    result => JSON.parse(result.stdout) as Benchmark[],
  )
}
