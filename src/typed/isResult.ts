import type { Result } from 'radashi'

/**
 * Returns true if the value is a `Result` object.
 *
 * @see https://radashi.js.org/reference/typed/isResult
 * @example
 * ```ts
 * isResult({ok: true, value: 42, error: undefined}) => true
 * isResult({ok: false, value: undefined, error: new Error()}) => true
 *
 * // Object must have all fields
 * isResult({ok: true, value: 42}) => false
 * isResult({ok: false, error: new Error()}) => false
 *
 * // Non-object values are false.
 * isResult([]) => false
 * isResult("") => false
 * isResult(null) => false
 *
 * // Results cannot have both a value and an error.
 * isResult({ok: true, value: 42, error: new Error()}) => false
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
