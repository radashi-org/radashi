declare const setTimeout: (fn: () => void, ms: number) => unknown

/**
 * Create a promise that resolves after a given amount of time.
 *
 * @see https://radashi.js.org/reference/async/sleep
 * @example
 * ```ts
 * await sleep(1000)
 * ```
 * @version 12.1.0
 */
export function sleep(milliseconds: number): Promise<void> {
  return new Promise(res => setTimeout(res, milliseconds))
}
