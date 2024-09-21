import { isResult, type Ok } from 'radashi'

/**
 * Returns true if the value is an `Ok` result.
 *
 * @see https://radashi.js.org/reference/typed/isResultOk
 * @example
 * ```ts
 * isResultOk([undefined, "hello"]) // true
 * isResultOk([new Error(), undefined]) // false
 * ```
 * @version 12.2.0
 */
export function isResultOk<TValue = unknown>(
  value: unknown,
): value is Ok<TValue> {
  return isResult(value) && value[0] === undefined
}
