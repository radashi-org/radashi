/**
 * Splits a single list into many lists of the desired size.
 *
 * @see https://radashi-org.github.io/reference/array/cluster
 * @example
 * ```ts
 * cluster([1, 2, 3, 4, 5, 6], 2)
 * // [[1, 2], [3, 4], [5, 6]]
 * ```
 */
export function cluster<T>(array: readonly T[], size = 2): T[][] {
  const clusters: T[][] = []
  for (let i = 0; i < array.length; i += size) {
    clusters.push(array.slice(i, i + size))
  }
  return clusters
}
