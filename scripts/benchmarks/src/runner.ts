import { execa } from 'execa'

const tsx = './scripts/benchmarks/node_modules/.bin/tsx'
const runner = './scripts/benchmarks/upsert-benchmark.ts'

export function runBenchmarksThenUpsert(file: string, sha: string) {
  console.log(`Running benchmarks in ./${file}`)
  return execa(tsx, [runner, '--file', file, '--sha', sha])
}
