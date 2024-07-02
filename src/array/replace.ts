/**
 * Replace an element in an array with a new item without modifying
 * the array and return the new value
 *
 * ```ts
 * replace([1, 2, 3], 4, (n) => n === 2)
 * // [1, 4, 3]
 * ```
 */
export function replace<T>(
  array: readonly T[],
  newItem: T,
  match: (item: T, idx: number) => boolean,
): T[] {
  if (!array) {
    return []
  }
  if (newItem === undefined) {
    return [...array]
  }
  for (let idx = 0; idx < array.length; idx++) {
    const item = array[idx]
    if (match(item, idx)) {
      return [
        ...array.slice(0, idx),
        newItem,
        ...array.slice(idx + 1, array.length),
      ]
    }
  }
  return [...array]
}
