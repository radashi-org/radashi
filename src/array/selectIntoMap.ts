/**
 * Create a new `Map` instance from an array.
 *
 * @see https://radashi-org.github.io/reference/array/selectIntoMap
 * @example
 * ```ts
 * const array = [
 *   { id: 1, name: 'Fred' },
 *   { id: 2, name: 'Annie' },
 * ]
 *
 * selectIntoMap(
 *   array,
 *   item => item.id,
 *   item => item.name,
 * )
 * // Map(2) { 1 => 'Fred', 2 => 'Annie' }
 * ```
 */
export function selectIntoMap<T, Key, Value = T>(
  iterable: Iterable<T>,
  getKey: (item: T, index: number) => Key,
  getValue: (item: T, index: number) => Value = item =>
    item as unknown as Value,
): Map<Key, Value> {
  const map: Map<Key, Value> = new Map()
  for (const item of iterable) {
    map.set(getKey(item, map.size), getValue(item, map.size))
  }
  return map
}

/**
 * @deprecated Use `selectIntoMap` instead.
 */
export const mapify: typeof selectIntoMap = selectIntoMap
