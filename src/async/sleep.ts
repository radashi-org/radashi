declare const setTimeout: (fn: () => void, ms: number) => unknown

/**
 * Create a promise that resolves after a given amount of time.
 *
 * @see https://radashi-org.github.io/reference/async/sleep
 * @example
 * ```ts
 * await sleep(1000)
 * ```
 */
export function sleep(milliseconds: number): Promise<void> {
  return new Promise(res => setTimeout(res, milliseconds))
}
