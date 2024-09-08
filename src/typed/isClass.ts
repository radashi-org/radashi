import { isFunction, type Class, type StrictExtract } from 'radashi'

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
export function isClass<T>(value: T): value is ExtractClass<T> {
  return isFunction(value) && value.toString().startsWith('class ')
}

/**
 * Used by the `isClass` type guard. It handles type narrowing for
 * class constructors and even narrows `any` types.
 */
export type ExtractClass<T> = [StrictExtract<T, Class>] extends [Class]
  ? Extract<T, Class>
  : T extends any
    ? Class<unknown[], unknown> extends T
      ? Class<unknown[], unknown>
      : never
    : never
