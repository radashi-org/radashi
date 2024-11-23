import { type Err, isResult } from 'radashi'

/**
 * Returns true if the value is an `Err` result.
 *
 * @see https://radashi.js.org/reference/typed/isResultErr
 * @example
 * ```ts
 * isResultErr([new Error(), undefined]) // true
 * isResultErr([undefined, "hello"]) // false
 * ```
 * @version 12.2.0
 */
export function isResultErr<TError extends Error = Error>(
  value: unknown,
): value is Err<TError> {
  return isResult(value) && value[0] !== undefined
}
