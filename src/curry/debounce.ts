declare const setTimeout: (fn: () => void, ms: number) => unknown
declare const clearTimeout: (timer: unknown) => void

export type DebounceFunction<TArgs extends any[]> = {
  (...args: TArgs): void
  /**
   * When called, future invocations of the debounced function are
   * no longer delayed and are instead executed immediately.
   */
  cancel(): void
  /**
   * Returns `true` if the underlying function is scheduled to be
   * called once the delay has passed.
   */
  isPending(): boolean
  /**
   * Invoke the underlying function immediately.
   */
  flush(...args: TArgs): void
}

export interface DebounceOptions {
  delay: number
  /**
   * When true, your callback is invoked immediately the very first
   * time the debounced function is called. After that, the debounced
   * function works as if `leading` was `false`.
   *
   * @default false
   */
  leading?: boolean
}

/**
 * Returns a new function that will only call your callback after
 * `delay` milliseconds have passed without any invocations.
 *
 * The debounced function has a few methods, such as `cancel`,
 * `isPending`, and `flush`.
 *
 * @see https://radashi.js.org/reference/curry/debounce
 * @example
 * ```ts
 * const myDebouncedFunc = debounce({ delay: 1000 }, (x) => {
 *   console.log(x)
 * })
 *
 * myDebouncedFunc(0) // Nothing happens
 * myDebouncedFunc(1) // Nothing happens
 * // Logs "1" about 1 second after the last invocation
 * ```
 * @version 12.1.0
 */
export function debounce<TArgs extends any[]>(
  { delay, leading }: DebounceOptions,
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
      if (leading) {
        func(...args)
        leading = false
      }
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
