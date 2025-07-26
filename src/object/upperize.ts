import { mapKeys } from 'radashi'

export type UppercaseKeys<T extends Record<string, any>> = {
  [P in keyof T & string as Uppercase<P>]: T[P]
}

/**
 * Convert all keys in an object to upper case.
 *
 * @see https://radashi.js.org/reference/object/upperize
 * @example
 * ```ts
 * const a = { a: 1, b: 2, c: 3 }
 * upperize(a)
 * // => { A: 1, B: 2, C: 3 }
 * ```
 * @version 12.1.0
 */
export function upperize<T extends Record<string, any>>(
  obj: T,
): UppercaseKeys<T> {
  return mapKeys(obj, k => k.toUpperCase()) as UppercaseKeys<T>
}
