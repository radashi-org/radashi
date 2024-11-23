import { isTagged } from 'radashi'

/**
 * Return true if the given value is a Date object.
 *
 * Instances from [other realms][1] are also supported.
 *
 * [1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof#instanceof_and_multiple_realms
 *
 * @see https://radashi.js.org/reference/typed/isDate
 * @example
 * ```ts
 * isDate(new Date()) // => true
 * isDate('hello') // => false
 * ```
 * @version 12.1.0
 */
export function isDate(value: unknown): value is Date {
  return isTagged(value, '[object Date]')
}
