import { type Err, isResult } from 'radashi'

/**
 * Returns true if the value is an `Err` result.
 *
 * @see https://radashi-org.github.io/reference/typed/isResultErr
 * @example
 * ```ts
 * isResultErr([new Error(), undefined]) // true
 * isResultErr([undefined, "hello"]) // false
 * ```
 */
export function isResultErr<TError = Error>(
  value: unknown,
): value is Err<TError> {
  return isResult(value) && value[0] !== undefined
}
