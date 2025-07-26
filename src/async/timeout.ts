import { isFunction, TimeoutError } from 'radashi'

declare const setTimeout: (fn: () => void, ms: number) => unknown

/**
 * The `timeout` function creates a promise that rejects after a
 * specified delay, with an optional custom error message or error
 * function.
 *
 * @see https://radashi.js.org/reference/async/timeout
 * @example
 * ```ts
 * // Reject after 1000 milliseconds with default message "timeout"
 * await timeout(1000)
 *
 * // Reject after 1000 milliseconds with a custom message
 * await timeout(1000, "Optional message")
 *
 * // Reject after 1000 milliseconds with a custom error
 * await timeout(1000, () => new Error("Custom error"))
 *
 * // Example usage with Promise.race to set a timeout for an asynchronous task
 * await Promise.race([
 *  someAsyncTask(),
 *  timeout(1000, "Optional message"),
 * ])
 * ```
 * @version 12.3.0
 */
export function timeout<TError extends Error>(
  /**
   * The number of milliseconds to wait before rejecting.
   */
  ms: number,
  /**
   * An error message or a function that returns an error. By default,
   * a `TimeoutError` is thrown with the message "Operation timed
   * out".
   */
  error?: string | (() => TError),
): Promise<never> {
  return new Promise((_, reject) =>
    setTimeout(
      () => reject(isFunction(error) ? error() : new TimeoutError(error)),
      ms,
    ),
  )
}
