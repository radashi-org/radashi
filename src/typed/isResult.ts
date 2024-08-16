import { isArray, isError, type Result } from 'radashi'

/**
 * Returns true if the value is a `Result` tuple.
 *
 * @see https://radashi-org.github.io/reference/typed/isResult
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
 */
export function isResult(value: unknown): value is Result<unknown, unknown> {
  return (
    isArray(value) &&
    value.length === 2 &&
    (isError(value[0]) ? value[1] : value[0]) === undefined
  )
}
