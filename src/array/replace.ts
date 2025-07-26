// biome-ignore lint/complexity/noBannedTypes: {} represents “all types but null/undefined”
type Defined<T> = T & ({} | null)

/**
 * Replace an element in an array with a new item without modifying
 * the array and return the new value.
 *
 * @see https://radashi.js.org/reference/array/replace
 * @example
 * ```ts
 * replace([1, 2, 3], 4, (n) => n === 2)
 * // [1, 4, 3]
 * ```
 * @version 12.1.0
 */
export function replace<T, U>(
  array: readonly T[],
  newItem: U,
  match: (item: T, idx: number) => boolean,
): (T | Defined<U>)[] {
  if (newItem === undefined) {
    return [...array]
  }
  const out = array.slice() as (T | Defined<U>)[]
  for (let index = 0; index < array.length; index++) {
    if (match(array[index], index)) {
      out[index] = newItem
      break
    }
  }
  return out
}
