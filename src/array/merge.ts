/**
 * Given two arrays of the same type, iterate the first list and
 * replace items matched by the `matcher` function in the first place.
 * The given arrays are never modified.
 *
 * @see https://radashi.js.org/reference/array/merge
 * @example
 * ```ts
 * merge(
 *   [{id: 1}, {id: 2}],
 *   [{id: 3}, {id: 1, name: 'John'}],
 *   (obj) => obj.id
 * )
 * // [{id: 1, name: 'John'}, {id: 2}]
 * ```
 */
export function merge<T>(
  prev: readonly T[],
  array: readonly T[],
  toKey: (item: T) => any,
): T[] {
  if (!array && !prev) {
    return []
  }
  if (!array) {
    return [...prev]
  }
  if (!prev) {
    return []
  }
  if (!toKey) {
    return [...prev]
  }
  const keys = new Map(array.map(v => [toKey(v), v]))
  return prev.map(prevItem => {
    const key = toKey(prevItem)

    return keys.has(key) ? keys.get(key)! : prevItem
  })
}
