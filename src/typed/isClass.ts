import { isFunction, type Class } from 'radashi'
/**
 * Checks if the given value is a class. This function verifies
 * if the value was defined using the `class` syntax. Old school
 * classes (defined with constructor functions) will return false.
 * "Native classes" like `Error` will also return false.
 *
 * @see https://radashi.js.org/reference/typed/isClass
 * @example
 * ```ts
 * isClass(class CustomClass {}) // => true
 * isClass('abc') // => false
 * isClass({}) // => false
 * ```
 */
export function isClass(value: unknown): value is Class {
  return isFunction(value) && value.toString().startsWith('class ')
}
