declare const console: {
  error: (...args: any[]) => void
}

/**
 * Attaches a rejection handler that logs to console.error.
 *
 * @see https://radashi.js.org/reference/async/unawaited
 * @example
 * ```ts
 * unawaited(asyncFunction())
 * ```
 * @version 12.3.0
 */
export function unawaited(promise: Promise<unknown>): void {
  promise.catch(console.error)
}
