/**
 * Replace the first occurrence of an item in an array where the
 * `match` function returns true. If no items match, append the new
 * item to the end of the list.
 *
 * ```ts
 * replaceOrAppend([1, 2, 3], 4, (n) => n > 1)
 * // [1, 4, 3]
 *
 * replaceOrAppend([1, 2, 3], 4, (n) => n > 100)
 * // [1, 2, 3, 4]
 * ```
 */
export function replaceOrAppend<T>(
  list: readonly T[],
  newItem: T,
  match: (a: T, idx: number) => boolean,
) {
  if (!list && !newItem) {
    return []
  }
  if (!newItem) {
    return [...list]
  }
  if (!list) {
    return [newItem]
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
  return [...list, newItem]
}
