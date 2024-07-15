import { castIterable, type CastIterableItem } from 'radashi'

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
export function cluster<T extends object>(
  array: T,
  size = 2,
): CastIterableItem<T>[][] {
  const clusters: any[][] = []
  let cluster = (clusters[0] = [] as any[])
  for (const item of castIterable(array)) {
    if (cluster.length === size) {
      clusters.push((cluster = []))
    }
    cluster.push(item)
  }
  return clusters
}
