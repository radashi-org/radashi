import { isFunction } from 'radashi'

export function withCapacity<
  T extends (...args: any[]) => Promise<any> = never,
>(capacity: number, job?: T): WithCapacity<T> {
  const pendingJobs: (() => void)[] = []

  let capacityTaken = 0

  const enqueue = async <T extends (...args: any[]) => Promise<any>>(
    job: T,
    weight: number,
    args?: Parameters<T>,
  ) => {
    if (capacityTaken + weight > capacity) {
      if (weight > capacity) {
        throw new Error('Weight is greater than capacity')
      }
      return new Promise(resolve => {
        pendingJobs.push(function run() {
          if (capacityTaken + weight > capacity) {
            pendingJobs.unshift(run)
          } else {
            resolve(enqueue(job, weight, args))
          }
        })
      })
    }
    capacityTaken += weight
    try {
      return await (args ? job(...args) : job())
    } finally {
      capacityTaken -= weight
      pendingJobs.shift()?.()
    }
  }

  const apply: Function = job
    ? (...args: Parameters<T>) => enqueue(job, 1, args)
    : <T>(
        arg: JobOptions | (() => Promise<T>),
        job?: () => Promise<T>,
      ): Promise<T> =>
        isFunction(arg) ? enqueue(arg, 1) : enqueue(job!, arg.weight)

  const queue = apply as WithCapacity<T>
  queue.hasCapacity = (weight = 1) => capacityTaken + weight <= capacity
  queue.clear = () => {
    pendingJobs.length = 0
  }
  return queue
}

export type JobOptions = {
  /**
   * Jobs have a weight. This is the amount of capacity they consume.
   */
  weight: number
}

interface JobRunner {
  <T>(options: JobOptions, job: () => Promise<T>): Promise<T>
  <T>(job: () => Promise<T>): Promise<T>
}

export type WithCapacity<T extends (...args: any[]) => Promise<any>> = ([
  T,
] extends [never]
  ? JobRunner
  : T) & {
  /**
   * Check if the semaphore has capacity for a given weight.
   *
   * @param weight - The weight to check for. If not provided, the weight will
   * be 1.
   */
  hasCapacity: (weight?: number) => boolean
  /**
   * Clear the queue. Note that this does not cancel any jobs that are already
   * running. If you need to cancel running jobs, you should do so manually
   * (e.g. by passing an `AbortSignal` to each job).
   */
  clear: () => void
}
