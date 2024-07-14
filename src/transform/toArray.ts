/**
 * Convert an object to an array, mapping each entry into an array item.
 *
 * @see https://radashi-org.github.io/reference/transform/toArray
 * @example
 * ```ts
 * const a = { a: 1, b: 2, c: 3 }
 * toArray(a, (key, value) => ({ key, value }))
 * // => [
 * //   { key: 'a', value: 1 },
 * //   { key: 'b', value: 2 },
 * //   { key: 'c', value: 3 }
 * // ]
 * ```
 */
export function toArray<Value, Key extends string | number | symbol, Item>(
  obj: Record<Key, Value>,
  toItem: (key: Key, value: Value) => Item,
): Item[] {
  if (!obj) {
    return []
  }
  const entries = Object.entries(obj)
  if (entries.length === 0) {
    return []
  }
  return entries.reduce((acc, entry) => {
    acc.push(toItem(entry[0] as Key, entry[1] as Value))
    return acc
  }, [] as Item[])
}

/**
 * @deprecated Use `toArray` instead.
 */
export const listify: typeof toArray = toArray
