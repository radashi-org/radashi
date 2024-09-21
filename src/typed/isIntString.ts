import { isString } from 'radashi'

/**
 * Return true if the given value is a string that can be parsed as an
 * integer.
 *
 * @see https://radashi.js.org/reference/typed/isIntString
 * @example
 * ```ts
 * isIntString('0') // => true
 * isIntString('0.1') // => false
 * isIntString('+1') // => false
 * ```
 * @version 12.2.0
 */
export function isIntString(value: any): value is string {
  if (!isString(value)) {
    return false
  }
  const num = +value
  return Number.isInteger(num) && `${num}` === value
}
