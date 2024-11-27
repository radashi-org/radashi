declare const setTimeout: (callback: () => void, delay: number) => unknown

/**
 * The options for the `bottleneck` function.
 *
 * @see https://radashi.js.org/reference/async/bottleneck
 */
export interface BottleneckOptions {
  /**
   * The maximum number of calls to allow per interval.
   *
   * @default 1
   */
  max?: number
  /**
   * The interval at which to allow the maximum number of calls.
   */
  interval: number
  /**
   * The maximum number of calls to allow at once.
   *
   * @default Infinity
   */
  concurrency?: number
}

/**
 * The return type of the `bottleneck` function.
 *
 * @see https://radashi.js.org/reference/async/bottleneck
 */
export type BottledFunction<Fn extends (...args: any[]) => any> = Fn & {
  /**
   * Prevent any throttled calls from ever running.
   *
   * Currently executing calls are not affected.
   *
   * @example
   * ```ts
   * const fn = bottleneck({ interval: 1000 }, () => console.log('hello'))
   * fn() // <- Runs immediately
   * fn() // <- Queued
   *
   * fn.cancel()
   * // Now, your function won't run until another call.
   * ```
   */
  cancel(): void
}

/**
 * Limit the rate at which a function is called.
 *
 * A maximum of `max` calls are allowed per `interval` milliseconds.
 *
 * Use the `concurrency` option for limiting the number of concurrent
 * calls.
 *
 * @see https://radashi.js.org/reference/async/bottleneck
 * @example
 * ```ts
 * const double = bottleneck(
 *   { max: 1, interval: 1000 },
 *   async (x: number) => x * 2
 * )
 * double(1) // <- Runs immediately
 * double(2) // <- Will wait 1 second
 * double(3) // <- Will wait 2 seconds
 * ```
 * @example Limited concurrency
 * ```ts
 * const double = bottleneck(
 *   { max: 5, interval: 1000, concurrency: 1 },
 *   async (x: number) => x * 2
 * )
 * double(1) // <- Runs immediately
 * double(2) // <- Will wait for 1 to finish
 * double(3) // <- Will wait for 2 to finish
 * ```
 */
export function bottleneck<Fn extends (...args: any[]) => any>(
  {
    max = 1,
    interval,
    concurrency = Number.POSITIVE_INFINITY,
  }: BottleneckOptions,
  fn: Fn,
): BottledFunction<Fn> {
  let numCalls = 0
  let numRunning = 0
  let startTime: number | undefined

  type TArgs = Parameters<Fn>
  type TReturn = Awaited<ReturnType<Fn>>

  type QueueItem = {
    args: TArgs
    resolve: (value: TReturn | PromiseLike<TReturn>) => void
    reject: (error: any) => void
  }

  const queue: QueueItem[] = []

  async function run(input: TArgs | QueueItem) {
    const now = Date.now()
    startTime ??= now

    if (now - startTime >= interval) {
      startTime = now
      numCalls = 0
    }

    if (numCalls < max && numRunning < concurrency) {
      // If this is the first call, schedule the flush.
      if (!numCalls && Number.isFinite(interval)) {
        setTimeout(next, interval)
      }

      let result: any

      numCalls++
      numRunning++
      try {
        const args = Array.isArray(input) ? input : input.args
        result = await fn(...args)
      } catch (error) {
        if (Array.isArray(input)) {
          throw error
        }
        return input.reject(error)
      } finally {
        numRunning--
        next()
      }

      return Array.isArray(input) ? result : input.resolve(result)
    }

    if (Array.isArray(input)) {
      // Return a queue promise for the throttled call.
      return new Promise<TReturn>((resolve, reject) => {
        queue.push({ args: input, resolve, reject })
      })
    }

    // Return the unused queue item to the queue.
    queue.unshift(input)
  }

  // This function is called when the interval has elapsed and after
  // every finished call.
  const next = () => queue.length && run(queue.shift()!)

  const bottled = ((...args: TArgs) => run(args)) as BottledFunction<Fn>

  bottled.cancel = () => {
    queue.length = 0
  }

  return bottled
}
