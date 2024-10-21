import { isNumber } from 'radashi'

/**
 * Return true if the given value is a number that is not an integer.
 *
 * @see https://radashi.js.org/reference/typed/isFloat
 * @example
 * ```ts
 * isFloat(0) // => false
 * isFloat(0.1) // => true
 * ```
 * @version 12.1.0
 */
export function isFloat(value: any): value is number {
  return isNumber(value) && !Number.isNaN(value) && value % 1 !== 0
}
