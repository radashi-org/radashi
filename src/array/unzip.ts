/**
 * Creates an array of ungrouped elements, where each resulting array
 * contains all elements at a specific index from the input arrays.
 * The first array contains all first elements, the second array
 * contains all second elements, and so on.
 *
 * @see https://radashi-org.github.io/reference/array/unzip
 * @example
 * ```ts
 * unzip([['a', 1, true], ['b', 2, false]])
 * // [['a', 'b'], [1, 2], [true, false]]
 * ```
 */
export function unzip<T>(arrays: readonly (readonly T[])[]): T[][] {
  if (!arrays || !arrays.length) {
    return []
  }
  const out = new Array(
    arrays.reduce((max, arr) => Math.max(max, arr.length), 0),
  )
  let index = 0
  const get = (array: T[]) => array[index]
  for (; index < out.length; index++) {
    out[index] = Array.from(arrays as { length: number }, get)
  }
  return out
}
