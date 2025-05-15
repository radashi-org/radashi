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
export function cluster<T, Size extends number = 2>(
  array: readonly T[],
  size: Size = 2 as Size,
): Cluster<T, Size>[] {
  const clusters: T[][] = []

  if (size > 0) {
    for (let i = 0; i < array.length; i += size) {
      clusters.push(array.slice(i, i + size))
    }
  }

  return clusters as Cluster<T, Size>[]
}

type Cluster<T, Size extends number> = Size extends 1
  ? [T]
  : Size extends 2
    ? [T, T]
    : Size extends 3
      ? [T, T, T]
      : Size extends 4
        ? [T, T, T, T]
        : Size extends 5
          ? [T, T, T, T, T]
          : Size extends 6
            ? [T, T, T, T, T, T]
            : Size extends 7
              ? [T, T, T, T, T, T, T]
              : Size extends 8
                ? [T, T, T, T, T, T, T, T]
                : T[]
