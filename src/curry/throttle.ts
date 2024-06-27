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
 * since the last invocation
 */
export function throttle<TArgs extends any[]>(
  { interval }: { interval: number },
  func: (...args: TArgs) => any,
) {
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
