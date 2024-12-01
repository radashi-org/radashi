/**
 * Checks if the given value is undefined.
 *
 * @see https://radashi.js.org/reference/typed/isUndefined
 * @example
 * ```ts
 * isUndefined(undefined) // => true
 * isUndefined(null) // => false
 * ```
 * @version 12.3.0
 */
export function isUndefined(value: unknown): value is undefined {
  return typeof value === 'undefined'
}
