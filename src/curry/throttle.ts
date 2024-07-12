declare const setTimeout: (fn: () => void, ms: number) => unknown

export type ThrottledFunction<TArgs extends any[]> = {
  (...args: TArgs): void
  /**
   * Checks if there is any invocation throttled
   */
  isThrottled(): boolean
}

/**
 * Given an interval and a function returns a new function that will
 * only call the source function if interval milliseconds have passed
 * since the last invocation.
 *
 * @see https://radashi-org.github.io/reference/curry/throttle
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
 */
export function throttle<TArgs extends any[]>(
  { interval }: { interval: number },
  func: (...args: TArgs) => any,
): ThrottledFunction<TArgs> {
  let ready = true
  let timer: unknown = undefined

  const throttled: ThrottledFunction<TArgs> = (...args: TArgs) => {
    if (!ready) {
      return
    }
    func(...args)
    ready = false
    timer = setTimeout(() => {
      ready = true
      timer = undefined
    }, interval)
  }
  throttled.isThrottled = () => {
    return timer !== undefined
  }
  return throttled
}
