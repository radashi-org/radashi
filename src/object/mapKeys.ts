/**
 * Map over all the keys of an object to return a new object.
 *
 * @see https://radashi.js.org/reference/object/mapKeys
 * @example
 * ```ts
 * const a = { a: 1, b: 2, c: 3 }
 * mapKeys(a, (key, value) => key + value)
 * // => { a1: 1, b2: 2, c3: 3 }
 * ```
 * @version 12.1.0
 */
export function mapKeys<
  TValue,
  TKey extends string | number | symbol,
  TNewKey extends string | number | symbol,
>(
  obj: Record<TKey, TValue>,
  mapFunc: (key: TKey, value: TValue) => TNewKey,
): Record<TNewKey, TValue> {
  const keys = Object.keys(obj) as TKey[]
  return keys.reduce(
    (acc, key) => {
      acc[mapFunc(key as TKey, obj[key])] = obj[key]
      return acc
    },
    {} as Record<TNewKey, TValue>,
  )
}
