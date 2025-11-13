/**
 * Returns a map entry or stores the computed value when the key is missing.
 *
 * @see https://radashi.js.org/reference/object/getOrInsertComputed
 * @example
 * ```ts
 * const counts = new Map<string, number>()
 *
 * getOrInsertComputed(counts, 'clicks', () => 1)
 * getOrInsertComputed(counts, 'clicks', () => 5)
 * // => 1
 * ```
 * @version 12.7.0
 */
export function getOrInsertComputed<K, V>(
  map: Map<K, V>,
  key: K,
  factory: () => V,
): V
export function getOrInsertComputed<K extends object, V>(
  map: Map<K, V> | WeakMap<K, V>,
  key: K,
  compute: () => V,
): V
export function getOrInsertComputed(
  map: Map<unknown, unknown> | WeakMap<object, unknown>,
  key: unknown,
  compute: () => unknown,
): unknown {
  if (map.has(key as any)) {
    return map.get(key as any)!
  }
  const newValue = compute()
  map.set(key as any, newValue)
  return newValue
}
