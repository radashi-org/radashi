import path from 'node:path'
import type { Reporter, RunnerTask } from 'vitest'

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
  handler: (benchmark: Benchmark) => void,
): Reporter {
  return {
    async onFinished(files) {
      for (const file of files) {
        const func = path.basename(file.filepath).replace(/\.bench\.ts$/, '')

        traverseTasks(file.tasks, func)
      }

      function traverseTasks(tasks: RunnerTask[], func: string) {
        for (const task of tasks) {
          if (task.type === 'suite') {
            traverseTasks(task.tasks, func)
          } else {
            const benchmark = task.meta?.benchmark && task.result?.benchmark
            if (!benchmark) {
              continue
            }

            handler({
              func,
              name: task.name,
              hz: benchmark.hz,
              sd: benchmark.sd,
              rme: benchmark.rme,
            })
          }
        }
      }
    },
  }
}
