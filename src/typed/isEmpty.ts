import { isDate, isFunction, isNumber, isSymbol } from 'radashi'

/**
 * Return true if the given value is empty.
 * This function also uses [Type Guards](https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards) to ensure type safety
 *
 * Empty values include:
 * - `null`
 * - `undefined`
 * - `0`
 * - `NaN`
 * - `''`
 * - `[]`
 * - `{}`
 * - invalid `Date` time
 * - object with `length` property of `0`
 * - object with `size` property of `0`
 * - object with no enumerable keys
 *
 * @see https://radashi.js.org/reference/typed/isEmpty
 * @example
 * ```ts
 * isEmpty(0) // => true
 * isEmpty(null) // => true
 * isEmpty(undefined) // => true
 * isEmpty([]) // => true
 * isEmpty({}) // => true
 * ```
 * @version 12.1.0
 */
export function isEmpty(value: boolean): value is false
export function isEmpty(value: number): value is 0
export function isEmpty(value: null | undefined | symbol): boolean
export function isEmpty<T>(value: T[]): value is never[]
export function isEmpty(value: string): value is ''
export function isEmpty<T extends Record<any, any>>(
  value: T,
): value is { [K in keyof T]: never }
export function isEmpty<T>(
  value: T | undefined | null,
): value is undefined | null
export function isEmpty(value: any): boolean
export function isEmpty(value: unknown): boolean {
  if (value === true || value === false) {
    return true
  }
  if (value === null || value === undefined) {
    return true
  }
  if (isNumber(value)) {
    return value === 0
  }
  if (isDate(value)) {
    return Number.isNaN(value.getTime())
  }
  if (isFunction(value)) {
    return false
  }
  if (isSymbol(value)) {
    return false
  }
  const length = (value as any).length
  if (isNumber(length)) {
    return length === 0
  }
  const size = (value as any).size
  if (isNumber(size)) {
    return size === 0
  }
  const keys = Object.keys(value).length
  return keys === 0
}
