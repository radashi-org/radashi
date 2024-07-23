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
  { interval, trailing = false }: { interval: number; trailing?: boolean },
  func: (...args: TArgs) => any,
): ThrottledFunction<TArgs> {
  let timer: ReturnType<typeof setTimeout> | undefined
  let lastCallTime: number | undefined
  let lastArgs: TArgs | undefined

  const throttled: ThrottledFunction<TArgs> = (...args: TArgs) => {
    const currentTime = Date.now()

    if (lastCallTime === undefined || currentTime - lastCallTime >= interval) {
      func(...args)
      lastCallTime = currentTime
      lastArgs = undefined
    } else {
      lastArgs = args
    }

    timer ??= setTimeout(() => {
      timer = undefined
      if (trailing && lastArgs) {
        func(...lastArgs)
        lastCallTime = Date.now()
        lastArgs = undefined
      }
    }, interval)
  }
  throttled.isThrottled = () => {
    return timer !== undefined
  }
  return throttled
}
