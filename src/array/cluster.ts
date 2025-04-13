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
export function cluster<T, N extends number = 2>(
  array: readonly T[],
  size: N = 2 as N,
): UniformTuple<T, N>[] {
  const clusters: T[][] = []
  for (let i = 0; i < array.length; i += size) {
    clusters.push(array.slice(i, i + size) as any)
  }
  return clusters as any
}

type UniformTuple<T, N extends number> = N extends 1 ? [T]
  : N extends 2 ? [T, T]
  : N extends 3 ? [T, T, T]
  : N extends 4 ? [T, T, T, T]
  : N extends 5 ? [T, T, T, T, T]
  : N extends 6 ? [T, T, T, T, T, T]
  : N extends 7 ? [T, T, T, T, T, T, T]
  : N extends 8 ? [T, T, T, T, T, T, T, T]
  : T[]
