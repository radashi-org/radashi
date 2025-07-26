import { noop } from 'radashi'

declare const setTimeout: (fn: () => void, ms: number) => unknown
declare const clearTimeout: (timer: unknown) => void

export interface DebounceFunction<TArgs extends any[] = any> {
  (...args: TArgs): void
  /**
   * Prevent the scheduled call from happening, if any.
   */
  cancel(): void
  /**
   * If a debounced call is scheduled, this invokes it immediately.
   * Otherwise, this equals Radashi's `noop` function.
   */
  flush(): void
  /**
   * The underlying function
   */
  readonly callee: (...args: TArgs) => unknown
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
 * Returns a new function that will only call the source function
 * after `delay` milliseconds have passed without any invocations.
 *
 * See the documentation (or the `DebounceFunction` type) for details
 * on the methods and properties available on the returned function.
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
  callee: (...args: TArgs) => unknown,
): DebounceFunction<TArgs> {
  let timeout: unknown

  const debounced = ((...args: TArgs) => {
    clearTimeout(timeout)
    if (leading) {
      leading = false
      callee(...args)
    } else {
      timeout = setTimeout(
        (debounced.flush = () => {
          debounced.flush = noop
          clearTimeout(timeout)
          callee(...args)
        }),
        delay,
      )
    }
  }) as DebounceFunction<TArgs> & { callee: typeof callee }

  debounced.callee = callee
  debounced.flush = noop
  debounced.cancel = () => {
    debounced.flush = noop
    clearTimeout(timeout)
  }

  return debounced
}
