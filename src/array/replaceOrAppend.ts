/**
 * Replace the first occurrence of an item in an array where the
 * `match` function returns true. If no items match, append the new
 * item to the end of the list.
 *
 * @see https://radashi.js.org/reference/array/replaceOrAppend
 * @example
 * ```ts
 * replaceOrAppend([1, 2, 3], 4, (n) => n > 1)
 * // [1, 4, 3]
 *
 * replaceOrAppend([1, 2, 3], 4, (n) => n > 100)
 * // [1, 2, 3, 4]
 * ```
 * @version 12.1.0
 */
export function replaceOrAppend<T>(
  array: readonly T[],
  newItem: T,
  match: (a: T, idx: number) => boolean,
): T[] {
  if (!array && !newItem) {
    return []
  }
  if (!newItem) {
    return [...array]
  }
  if (!array) {
    return [newItem]
  }
  const out = array.slice()
  for (let index = 0; index < array.length; index++) {
    if (match(array[index], index)) {
      out[index] = newItem
      return out
    }
  }
  out.push(newItem)
  return out
}
