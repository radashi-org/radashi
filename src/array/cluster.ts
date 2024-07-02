/**
 * Splits a single list into many lists of the desired size.
 *
 * ```ts
 * cluster([1, 2, 3, 4, 5, 6], 2)
 * // [[1, 2], [3, 4], [5, 6]]
 * ```
 */
export function cluster<T>(array: readonly T[], size = 2): T[][] {
  const clusterCount = Math.ceil(array.length / size)
  return new Array(clusterCount).fill(null).map((_c: null, i: number) => {
    return array.slice(i * size, i * size + size)
  })
}
