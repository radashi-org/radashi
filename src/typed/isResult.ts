import { isArray, type Result } from 'radashi'

/**
 * Returns true if the value is a `Result` tuple.
 *
 * @see https://radashi-org.github.io/reference/typed/isResult
 * @example
 * ```ts
 * isResult([undefined, 42]) => true
 * isResult([new Error(), undefined]) => true
 *
 * // Result tuples cannot have both a value and an error, or neither.
 * isResult([undefined, undefined]) => false
 * isResult([new Error(), true]) => false
 *
 * // Tuple must be of length 2.
 * isResult([new Error()]) => false
 * isResult([undefined, true, undefined]) => false
 *
 * // Non-tuple values are false.
 * isResult([]) => false
 * isResult({}) => false
 * isResult(null) => false
 * ```
 */
export function isResult(value: unknown): value is Result<unknown, unknown> {
  return (
    isArray(value) &&
    value.length === 2 &&
    (value[0] === undefined) !== (value[1] === undefined)
  )
}
