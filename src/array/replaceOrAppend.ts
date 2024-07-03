// biome-ignore lint/complexity/noBannedTypes: {} represents “all types but null/undefined”
type Defined<T> = T & ({} | null)

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
export function replaceOrAppend<T, U>(
  array: readonly T[],
  newItem: U,
  match: (a: T, idx: number) => boolean,
): (T | Defined<U>)[] {
  if (newItem === undefined) {
    return [...array]
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
