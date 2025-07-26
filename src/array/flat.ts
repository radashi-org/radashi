/**
 * Given an array of arrays, returns a single dimensional array with
 * all items in it.
 *
 * @see https://radashi.js.org/reference/array/flat
 * @example
 * ```ts
 * flat([[1, 2], [[3], 4], [5]])
 * // [1, 2, [3], 4, 5]
 * ```
 * @version 12.1.0
 */
export function flat<T>(lists: readonly T[][]): T[] {
  return lists.reduce((acc, list) => {
    acc.push(...list)
    return acc
  }, [])
}
