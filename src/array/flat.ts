/**
 * Given an array of arrays, returns a single dimensional array with
 * all items in it.
 *
 * @see https://radashi-org.github.io/reference/array/flat
 * @example
 * ```ts
 * flat([[1, 2], [[3], 4], [5]])
 * // [1, 2, [3], 4, 5]
 * ```
 *
 * @deprecated - use [Array.prototype.flat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat) insted
 */
export function flat<T>(lists: readonly T[][]): T[] {
  return lists.flat()
}
