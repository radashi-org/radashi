/**
 * Checks if the given value is a string.
 *
 * @see https://radashi.js.org/reference/typed/isString
 * @example
 * ```ts
 * isString('abc') // => true
 * isString(123) // => false
 * ```
 * @version 12.1.0
 */
export function isString(value: unknown): value is string {
  return typeof value === 'string'
}
