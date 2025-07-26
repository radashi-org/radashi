import path from 'node:path'
import type { Reporter, RunnerTask } from 'vitest'

export interface BenchmarkReport {
  file: string
  location: { line: number; column: number }
  benchmark: Benchmark
  baseline?: { hz: number; rme: number } | null
}

export interface Benchmark {
  func: string
  name: string
  /** Cycles per second */
  hz: number
  /** Standard deviation */
  sd: number
  /** Relative mean error */
  rme: number
}

export function reportToBenchmarkHandler(
  handler: (report: BenchmarkReport) => void,
): Reporter {
  return {
    async onFinished(files) {
      for (const file of files) {
        const func = path.basename(file.filepath, '.bench.ts')
        traverseTasks(file.tasks, func)
      }

      function traverseTasks(tasks: RunnerTask[], func: string) {
        for (const task of tasks) {
          if (task.type === 'suite') {
            traverseTasks(task.tasks, func)
          } else {
            const benchmark = task.meta?.benchmark && task.result?.benchmark
            if (benchmark) {
              handler({
                file: path.relative(process.cwd(), task.file.filepath),
                location: task.location!,
                benchmark: {
                  func,
                  name: task.name,
                  hz: benchmark.hz,
                  sd: benchmark.sd,
                  rme: benchmark.rme,
                },
              })
            }
          }
        }
      }
    },
  }
}
