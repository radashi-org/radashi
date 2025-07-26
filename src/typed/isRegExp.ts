import { isTagged } from 'radashi'

/**
 * Checks if the given value is a RegExp.
 *
 * Instances from [other realms][1] are also supported.
 *
 * [1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof#instanceof_and_multiple_realms
 *
 * @see https://radashi.js.org/reference/typed/isRegExp
 * @example
 * ```ts
 * isRegExp(/abc/) // => true
 * isRegExp('abc') // => false
 * ```
 * @version 12.2.0
 */
export function isRegExp(value: unknown): value is RegExp {
  return isTagged(value, '[object RegExp]')
}
