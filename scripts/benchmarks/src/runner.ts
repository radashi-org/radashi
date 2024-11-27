import { execa } from 'execa'
import type { BenchmarkReport } from './reporter.ts'

export async function runVitest(file: string) {
  console.log(`Running benchmarks in ./${file}`)
  const result = await execa('node', ['scripts/run', 'bench-file', file], {
    reject: false,
  })
  if (result.exitCode !== 0) {
    console.error(result.stderr)
    throw new Error('Benchmark failed. See above for details.')
  }
  return JSON.parse(result.stdout) as BenchmarkReport[]
}
