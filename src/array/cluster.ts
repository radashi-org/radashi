import { reduceIterable, type CastIterableItem } from 'radashi'

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
  iterable: T,
  size = 2,
): CastIterableItem<T>[][] {
  const clusters = [[]] as any[][]
  let [cluster] = clusters
  return reduceIterable(
    iterable,
    (clusters, item) => {
      if (cluster.length === size) {
        clusters.push((cluster = []))
      }
      cluster.push(item)
      return clusters
    },
    clusters,
  )
}
