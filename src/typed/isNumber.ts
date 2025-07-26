/**
 * Return true if the given value is a number.
 *
 * @see https://radashi.js.org/reference/typed/isNumber
 * @example
 * ```ts
 * isNumber(0) // => true
 * isNumber('0') // => false
 * isNumber(NaN) // => true
 * ```
 * @version 12.1.0
 */
export function isNumber(value: unknown): value is number {
  return typeof value === 'number'
}
