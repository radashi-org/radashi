/**
 * Convert an object to a list, mapping each entry into a list item.
 *
 * @see https://radashi.js.org/reference/object/listify
 * @example
 * ```ts
 * const a = { a: 1, b: 2, c: 3 }
 * listify(a, (key, value) => ({ key, value }))
 * // => [
 * //   { key: 'a', value: 1 },
 * //   { key: 'b', value: 2 },
 * //   { key: 'c', value: 3 }
 * // ]
 * ```
 * @version 12.1.0
 */
export function listify<Value, Key extends string | number | symbol, Item>(
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
