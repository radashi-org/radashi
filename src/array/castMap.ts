/**
 * Create a new `Map` instance from an array.
 *
 * @see https://radashi-org.github.io/reference/transform/castMap
 * @example
 * ```ts
 * const array = [
 *   { id: 1, name: 'Fred' },
 *   { id: 2, name: 'Annie' },
 * ]
 *
 * castMap(
 *   array,
 *   item => item.id,
 *   item => item.name,
 * )
 * // Map(2) { 1 => 'Fred', 2 => 'Annie' }
 * ```
 */
export function castMap<T, Key, Value = T>(
  array: readonly T[],
  getKey: (item: T, index: number) => Key,
  getValue: (item: T, index: number) => Value = item =>
    item as unknown as Value,
): Map<Key, Value> {
  const map: Map<Key, Value> = new Map()
  for (const item of array) {
    map.set(getKey(item, map.size), getValue(item, map.size))
  }
  return map
}

/**
 * @deprecated Use `castMap` instead.
 */
export const mapify: typeof castMap = castMap
