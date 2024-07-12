/**
 * Create a new `Map` instance from an array.
 *
 * @see https://radashi-org.github.io/reference/array/mapify
 * @example
 * ```ts
 * const array = [
 *   { id: 1, name: 'Fred' },
 *   { id: 2, name: 'Annie' },
 * ]
 *
 * mapify(
 *   array,
 *   item => item.id,
 *   item => item.name,
 * )
 * // Map(2) { 1 => 'Fred', 2 => 'Annie' }
 * ```
 */
export function mapify<T, Key, Value = T>(
  array: readonly T[],
  getKey: (item: T) => Key,
  getValue: (item: T) => Value = item => item as unknown as Value,
): Map<Key, Value> {
  const map: Map<Key, Value> = new Map()
  for (const item of array) {
    map.set(getKey(item), getValue(item))
  }
  return map
}
