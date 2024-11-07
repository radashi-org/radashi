/**
 * Map over all the keys to create a new object.
 *
 * @see https://radashi.js.org/reference/object/mapValues
 * @example
 * ```ts
 * const a = { a: 1, b: 2, c: 3 }
 * mapValues(a, (value, key) => value * 2)
 * // => { a: 2, b: 4, c: 6 }
 * ```
 * @version 12.1.0
 */
export function mapValues<T extends object, U>(
  obj: T,
  mapFunc: (value: Required<T>[keyof T], key: keyof T) => U,
): { [K in keyof T]: U } {
  return (Object.keys(obj) as (keyof T)[]).reduce(
    (acc, key) => {
      acc[key] = mapFunc(obj[key], key)
      return acc
    },
    {} as { [K in keyof T]: U },
  )
}
