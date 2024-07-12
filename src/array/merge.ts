/**
 * Given two arrays of the same type, iterate the first list and
 * replace items matched by the `matcher` function in the first place.
 * The given arrays are never modified.
 *
 * @see https://radashi-org.github.io/reference/array/merge
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
  const keys = array.map(toKey)
  return prev.map(prevItem => {
    const index = keys.indexOf(toKey(prevItem))
    return index > -1 ? array[index] : prevItem
  })
}
