/**
 * Replace an item in an array by a match function condition. If no
 * items match the function condition, appends the new item to the end
 * of the list.
 */
export const replaceOrAppend = <T>(
  list: readonly T[],
  newItem: T,
  match: (a: T, idx: number) => boolean
) => {
  if (!list && !newItem) return []
  if (!newItem) return [...list]
  if (!list) return [newItem]
  for (let idx = 0; idx < list.length; idx++) {
    const item = list[idx]
    if (match(item, idx)) {
      return [
        ...list.slice(0, idx),
        newItem,
        ...list.slice(idx + 1, list.length)
      ]
    }
  }
  return [...list, newItem]
}
