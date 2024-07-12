import { isNumber } from 'radashi'

/**
 * Return true if the given value is a number that is not an integer.
 *
 * @see https://radashi-org.github.io/reference/typed/isFloat
 * @example
 * ```ts
 * isFloat(0) // => false
 * isFloat(0.1) // => true
 * ```
 */
export function isFloat(value: any): value is number {
  return isNumber(value) && value % 1 !== 0
}
