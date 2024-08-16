/**
 * Given an array of arrays, returns a single dimensional array with
 * all items in it.
 *
 * @deprecated Use [Array.prototype.flat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat) instead.
 *
 * @see https://radashi-org.github.io/reference/array/flat
 * @example
 * ```ts
 * flat([[1, 2], [[3], 4], [5]])
 * // [1, 2, [3], 4, 5]
 * ```
 */
export function flat<T>(lists: readonly T[][]): T[] {
  return lists.flat()
}
