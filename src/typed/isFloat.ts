import { isNumber } from 'radashi'

/**
 * Return true if the given value is a non-integer number, including
 * Infinity and -Infinity. Return false for integers, NaN, and
 * non-number values.
 *
 * @see https://radashi.js.org/reference/typed/isFloat
 * @example
 * ```ts
 * isFloat(0) // => false
 * isFloat(0.1) // => true
 * isFloat(Infinity) // => true
 * isFloat(-Infinity) // => true
 * isFloat(NaN) // => false
 * ```
 * @version 12.1.0
 */
export function isFloat(value: any): value is number {
  return isNumber(value) && !Number.isNaN(value) && value % 1 !== 0
}
