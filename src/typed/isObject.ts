import { isTagged } from 'radashi'

/**
 * Returns true if `value` is a plain object, a class instance
 * (excluding built-in classes like Date/RegExp), or an
 * `Object.create(null)` result. Objects from [other realms][1] are
 * also supported.
 *
 * [1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof#instanceof_and_multiple_realms
 *
 * @see https://radashi.js.org/reference/typed/isObject
 * @example
 * ```ts
 * isObject({}) // true
 * isObject(new Object()) // true
 * isObject(Object.create(null)) // true
 * isObject(new class {}) // true
 *
 * isObject([]) // false
 * isObject(/.+/g) // false
 * isObject(new Date()) // false
 * isObject(new Map()) // false
 * isObject(new Set()) // false
 * ```
 * @version 12.1.0
 */
export function isObject(value: unknown): value is object {
  return isTagged(value, '[object Object]')
}
