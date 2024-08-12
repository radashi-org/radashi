import { execa } from 'execa'
import type { Benchmark } from './reporter'

const tsx = './scripts/benchmarks/node_modules/.bin/tsx'
const runner = './scripts/benchmarks/vitest-bench.ts'

export function runVitest(file: string) {
  console.log(`Running benchmarks in ./${file}`)

  // https://pythonspeed.com/articles/consistent-benchmarking-in-ci/
  return execa(tsx, [runner, file], { reject: false }).then(result => {
    if (result.exitCode === 1) {
      console.error(result.stderr)
      throw new Error('Benchmark failed. See above for details.')
    }
    return JSON.parse(result.stdout) as Benchmark[]
  })
}
