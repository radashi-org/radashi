declare const setTimeout: (fn: () => void, ms: number) => unknown
declare const clearTimeout: (timer: unknown) => void

export type ThrottledFunction<TArgs extends any[]> = {
  (...args: TArgs): void
  /**
   * Checks if there is any invocation throttled
   */
  isThrottled(): boolean
  /**
   * Call the throttled function immediately, ignoring any throttling
   * that may be in effect. After, a new throttled call will be allowed
   * after the interval has passed.
   *
   * @example
   * ```ts
   * const logMessage = (message: string) => {
   *   console.log(`Message: ${message}`)
   * }
   * const throttledLog = throttle({ interval: 1000 }, logMessage)
   *
   * throttledLog('First call')  // Logs immediately
   * throttledLog('Throttled')   // Doesn't log (throttled)
   *
   * // Force a log, bypassing the throttle
   * throttledLog.trigger('Forced log')  // Logs immediately
   *
   * // Check if it's still throttled
   * throttledLog.isThrottled()  // => true
   * ```
   */
  trigger(...args: TArgs): void
}

/**
 * Given an interval and a function returns a new function that will
 * only call the source function if interval milliseconds have passed
 * since the last invocation.
 *
 * @see https://radashi.js.org/reference/curry/throttle
 * @example
 * ```ts
 * const sup = throttle({ interval: 1000 }, () => {
 *   console.log("sup")
 * })
 * sup() // => logs "sup"
 * sup() // => no logs
 * setTimeout(() => sup(), 500) // => no logs
 * setTimeout(() => sup(), 1000) // => logs "sup"
 * ```
 * @version 12.1.0
 */
export function throttle<TArgs extends any[]>(
  { interval, trailing }: { interval: number; trailing?: boolean },
  func: (...args: TArgs) => any,
): ThrottledFunction<TArgs> {
  let timer: unknown
  let lastCalled = 0
  let trailingArgs: TArgs | undefined

  const throttled: ThrottledFunction<TArgs> = (...args: TArgs) => {
    if (!isThrottled()) {
      trigger(...args)
    } else if (trailing) {
      trailingArgs = args
    }
  }

  const isThrottled = () => Date.now() - lastCalled < interval
  throttled.isThrottled = isThrottled

  const trigger = (throttled.trigger = (...args: TArgs) => {
    func(...args)
    lastCalled = Date.now()

    if (trailing) {
      trailingArgs = undefined

      clearTimeout(timer)
      timer = setTimeout(
        () => trailingArgs && trigger(...trailingArgs),
        interval,
      )
    }
  })

  return throttled
}
