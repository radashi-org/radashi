/**
 * Returns a map entry or stores and returns the provided value when missing.
 *
 * @see https://radashi.js.org/reference/object/getOrInsert
 * @example
 * ```ts
 * const counts = new Map<string, number>()
 *
 * getOrInsert(counts, 'clicks', 1)
 * getOrInsert(counts, 'clicks', 5)
 * // => 1
 * ```
 * @version 12.7.0
 */
export function getOrInsert<K, V>(map: Map<K, V>, key: K, value: V): V
export function getOrInsert<K extends object, V>(
  map: Map<K, V> | WeakMap<K, V>,
  key: K,
  value: V,
): V
export function getOrInsert(
  map: Map<unknown, unknown> | WeakMap<object, unknown>,
  key: unknown,
  value: unknown,
): unknown {
  if (map.has(key as any)) {
    return map.get(key as any)!
  }
  map.set(key as any, value)
  return value
}
