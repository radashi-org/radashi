import type { Result } from 'radashi'

/**
 * Returns true if the value is a `Result` tuple.
 *
 * @see https://radashi.js.org/reference/typed/isResult
 * @example
 * ```ts
 * isResult([undefined, 42]) => true
 * isResult([new Error(), undefined]) => true
 *
 * // Tuple must be of length 2.
 * isResult([new Error()]) => false
 * isResult([undefined, true, undefined]) => false
 *
 * // Non-tuple values are false.
 * isResult([]) => false
 * isResult({}) => false
 * isResult(null) => false
 *
 * // Result tuples cannot have both a value and an error.
 * isResult([new Error(), true]) => false
 * ```
 * @version 12.2.0
 */
export function isResult(value: unknown): value is Result<unknown, unknown> {
  return (
    typeof value === 'object' &&
    value !== null &&
    'ok' in value &&
    'value' in value &&
    'error' in value &&
    ((value.ok === true && value.error === undefined) ||
      (value.ok === false && value.value === undefined))
  )
}
