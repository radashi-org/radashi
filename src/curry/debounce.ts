declare const setTimeout: (fn: () => void, ms: number) => unknown
declare const clearTimeout: (timer: unknown) => void

export type DebounceFunction<TArgs extends any[]> = {
  (...args: TArgs): void
  /**
   * Cancels the debounced function
   */
  cancel(): void
  /**
   * Checks if there is any invocation debounced
   */
  isPending(): boolean
  /**
   * Runs the debounced function immediately
   */
  flush(...args: TArgs): void
}

/**
 * Given a delay and a function returns a new function that will only
 * call the source function after delay milliseconds have passed
 * without any invocations.
 *
 * The debounce function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to invoke them
 * immediately
 */
export function debounce<TArgs extends any[]>(
  { delay }: { delay: number },
  func: (...args: TArgs) => any,
): DebounceFunction<TArgs> {
  let timer: unknown = undefined
  let active = true

  const debounced: DebounceFunction<TArgs> = (...args: TArgs) => {
    if (active) {
      clearTimeout(timer)
      timer = setTimeout(() => {
        active && func(...args)
        timer = undefined
      }, delay)
    } else {
      func(...args)
    }
  }
  debounced.isPending = () => {
    return timer !== undefined
  }
  debounced.cancel = () => {
    active = false
  }
  debounced.flush = (...args: TArgs) => func(...args)

  return debounced
}
