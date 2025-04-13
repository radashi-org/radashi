/**
 * Splits a single list into many lists of the desired size.
 *
 * @see https://radashi.js.org/reference/array/cluster
 * @example
 * ```ts
 * cluster([1, 2, 3, 4, 5, 6], 2)
 * // [[1, 2], [3, 4], [5, 6]]
 * ```
 * @version 12.1.0
 */
export function cluster<T, N extends number = 2>(array: readonly T[], size: N = 2 as N): UniformTuple<T, N>[] {
  const clusters: UniformTuple<T, N>[] = []
  for (let i = 0; i < array.length; i += size) {
    clusters.push(array.slice(i, i + size) as UniformTuple<T, N>)
  }
  return clusters
}

type UniformTuple<T, N extends number, R extends T[] = []> = R['length'] extends N ? R : UniformTuple<T, N, [T, ...R]>
