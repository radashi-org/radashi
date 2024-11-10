import { isDate, isFunction, isNumber, isSymbol } from 'radashi'

/**
 * Return true if the given value is empty.
 * This function also uses [Type Guards](https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards) to ensure type safety
 *
 * Empty values include:
 * - `null`
 * - `undefined`
 * - `0`
 * - empty string
 * - empty array
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
export function isEmpty<T extends ToEmptyAble>(value: T): value is ToEmpty<T>
export function isEmpty(value: unknown): boolean
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

// biome-ignore lint/complexity/noBannedTypes:
type NeverEmpty = symbol | Function

/**
 * A type that can be narrowed by `isEmpty`.
 */
export type ToEmptyAble =
  | NeverEmpty
  | boolean
  | number
  | string
  | readonly any[]
  | null
  | undefined

/**
 * Narrow a type to an empty value.
 *
 * Due to TypeScript limitations, object types cannot be narrowed,
 * except for arrays and functions.
 */
export type ToEmpty<T extends ToEmptyAble> = (
  T extends any[]
    ? never[]
    : Extract<false | 0 | '' | readonly never[] | null | undefined, T>
) extends infer U
  ? Extract<U, T>
  : never
