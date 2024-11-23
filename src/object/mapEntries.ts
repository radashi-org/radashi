/**
 * Map over all the keys to create a new object.
 *
 * @see https://radashi.js.org/reference/object/mapEntries
 * @example
 * ```ts
 * const a = { a: 1, b: 2, c: 3 }
 * mapEntries(a, (key, value) => [value, key])
 * // => { 1: 'a', 2: 'b', 3: 'c' }
 * ```
 * @version 12.1.0
 */
export function mapEntries<
  TKey extends string | number | symbol,
  TValue,
  TNewKey extends string | number | symbol,
  TNewValue,
>(
  obj: Record<TKey, TValue>,
  toEntry: (key: TKey, value: TValue) => [TNewKey, TNewValue],
): Record<TNewKey, TNewValue> {
  if (!obj) {
    return {} as Record<TNewKey, TNewValue>
  }
  return Object.entries(obj).reduce(
    (acc, [key, value]) => {
      const [newKey, newValue] = toEntry(key as TKey, value as TValue)
      acc[newKey] = newValue
      return acc
    },
    {} as Record<TNewKey, TNewValue>,
  )
}
