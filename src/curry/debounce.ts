import { noop } from 'radashi'

declare const setTimeout: (fn: () => void, ms: number) => unknown
declare const clearTimeout: (timer: unknown) => void

export interface DebounceFunction<TArgs extends any[] = any, TReturn = void> {
  (...args: TArgs): TReturn
  /**
   * Prevent the scheduled call from happening, if any.
   */
  cancel(): void
  /**
   * If a debounced call is scheduled, this invokes it immediately.
   */
  flush(): void
  /**
   * Returns true if a debounced call is scheduled.
   */
  isDebounced(): boolean
  /**
   * The underlying function
   */
  readonly callee: (...args: TArgs) => unknown
}

export type Debounced<TCallee extends (...args: any[]) => any> =
  DebounceFunction<Parameters<TCallee>> & { callee: TCallee }

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
export function debounce<TCallee extends (...args: any[]) => any>(
  { delay, leading }: DebounceOptions,
  callee: TCallee,
): Debounced<TCallee> {
  type TArgs = Parameters<TCallee>

  let timeout: unknown

  const debounced = ((...args: TArgs) => {
    if (leading) {
      leading = false
      callee(...args)
    } else {
      clearTimeout(timeout)
      timeout = setTimeout(
        (debounced.flush = () => {
          debounced.cancel()
          callee(...args)
        }),
        delay,
      )
    }
  }) as Debounced<TCallee>

  debounced.callee = callee
  debounced.isDebounced = () => timeout !== undefined
  debounced.flush = noop
  debounced.cancel = () => {
    debounced.flush = noop
    clearTimeout(timeout)
    timeout = undefined
  }

  return debounced
}
