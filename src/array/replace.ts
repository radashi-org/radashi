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
  list: readonly T[],
  newItem: T,
  match: (item: T, idx: number) => boolean,
): T[] {
  if (!list) {
    return []
  }
  if (newItem === undefined) {
    return [...list]
  }
  for (let idx = 0; idx < list.length; idx++) {
    const item = list[idx]
    if (match(item, idx)) {
      return [
        ...list.slice(0, idx),
        newItem,
        ...list.slice(idx + 1, list.length),
      ]
    }
  }
  return [...list]
}
