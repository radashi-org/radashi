/**
 * Convert an array to a dictionary by mapping each item into a
 * dictionary key & value.
 *
 * @see https://radashi.js.org/reference/array/objectify
 * @example
 * ```ts
 * objectify([1, 2, 3], (n) => '#' + n)
 * // { '#1': 1, '#2': 2, '#3': 3 }
 *
 * objectify(
 *   [{id: 1, name: 'John'}, {id: 2, name: 'Jane'}],
 *   (obj) => obj.id,
 *   (obj) => obj.name
 * )
 * // { 1: 'John', 2: 'Jane' }
 * ```
 * @version 12.1.0
 */
export function objectify<T, Key extends string | number | symbol, Value = T>(
  array: readonly T[],
  getKey: (item: T) => Key,
  getValue: (item: T) => Value = item => item as unknown as Value,
): Partial<Record<Key, Value>> {
  return array.reduce((acc, item) => {
    acc[getKey(item)] = getValue(item)
    return acc
  }, {} as Partial<Record<Key, Value>>)
}
