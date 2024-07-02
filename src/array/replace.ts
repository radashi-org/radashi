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
  const out = array.slice()
  for (let index = 0; index < array.length; index++) {
    const item = array[index]
    if (match(item, index)) {
      out[index] = newItem
      break
    }
  }
  return out
}
