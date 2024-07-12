/**
 * Convert an array to a dictionary by mapping each item into a
 * dictionary key & value.
 *
 * @see https://radashi-org.github.io/reference/array/objectify
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
 */
export function objectify<T, Key extends string | number | symbol, Value = T>(
  array: readonly T[],
  getKey: (item: T) => Key,
  getValue: (item: T) => Value = item => item as unknown as Value,
): Record<Key, Value> {
  return array.reduce(
    (acc, item) => {
      acc[getKey(item)] = getValue(item)
      return acc
    },
    {} as Record<Key, Value>,
  )
}
