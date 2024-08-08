import { type Err, isArray, type Ok, type Result } from 'radashi'

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

/**
 * Returns true if the value is an `Ok` result.
 *
 * @see https://radashi-org.github.io/reference/typed/isResult#isResultOk
 */
export function isResultOk<TValue = unknown>(
  value: unknown,
): value is Ok<TValue> {
  return isResult(value) && value[0] == null
}

/**
 * Returns true if the value is an `Err` result.
 *
 * @see https://radashi-org.github.io/reference/typed/isResult#isResultErr
 */
export function isResultErr<TError = Error>(
  value: unknown,
): value is Err<TError> {
  return isResult(value) && value[0] != null
}
