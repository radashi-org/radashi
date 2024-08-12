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
        traverseTasks(file.tasks, func, false)
      }

      function traverseTasks(
        tasks: RunnerTask[],
        func: string,
        isBaseline: boolean,
      ) {
        for (const task of tasks) {
          if (task.type === 'suite') {
            traverseTasks(task.tasks, func, task.name === 'baseline')
          } else {
            const benchmark = task.meta?.benchmark && task.result?.benchmark
            if (benchmark) {
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
      }
    },
  }
}
