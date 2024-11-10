import { isString } from 'radashi'

declare const setTimeout: (fn: () => void, ms: number) => unknown

/**
 * Creates a promise that will reject after a specified amount of time.
 * You can provide a custom error message or a function that returns an error.
 *
 * @see https://radashi.js.org/reference/async/timeout
 *
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

export function timeout<E extends Error>(
  milliseconds: number,
  /**
   * The error message to reject with.
   *
   * @default "timeout"
   */
  error: string | (() => E) = 'timeout',
): Promise<void> {
  return new Promise((_, rej) =>
    setTimeout(() => {
      if (isString(error)) {
        rej(new Error(error))
      } else {
        rej(error())
      }
    }, milliseconds),
  )
}
