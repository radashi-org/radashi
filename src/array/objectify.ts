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
  getKey: (item: T, index: number) => Key,
  getValue: (item: T, index: number) => Value = (item): any => item,
): Partial<Record<Key, Value>> {
  return array.reduce(
    (acc, item, i) => {
      acc[getKey(item, i)] = getValue(item, i)
      return acc
    },
    {} as Partial<Record<Key, Value>>,
  )
}
