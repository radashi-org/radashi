/**
 * Creates an array of grouped elements, the first of which contains
 * the first elements of the given arrays, the second of which
 * contains the second elements of the given arrays, and so on.
 *
 * ```ts
 * zip(['a', 'b'], [1, 2], [true, false])
 * // [['a', 1, true], ['b', 2, false]]
 * ```
 */
export function zip<T1, T2, T3, T4, T5>(
  array1: T1[],
  array2: T2[],
  array3: T3[],
  array4: T4[],
  array5: T5[]
): [T1, T2, T3, T4, T5][]
export function zip<T1, T2, T3, T4>(
  array1: T1[],
  array2: T2[],
  array3: T3[],
  array4: T4[]
): [T1, T2, T3, T4][]
export function zip<T1, T2, T3>(
  array1: T1[],
  array2: T2[],
  array3: T3[]
): [T1, T2, T3][]
export function zip<T1, T2>(array1: T1[], array2: T2[]): [T1, T2][]
export function zip<T>(...arrays: T[][]): T[][] {
  if (!arrays || !arrays.length) {
    return []
  }
  return new Array(Math.max(...arrays.map(({ length }) => length)))
    .fill([])
    .map((_, idx) => arrays.map(array => array[idx]))
}
