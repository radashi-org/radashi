import { unzip } from 'radashi'

/**
 * Creates an array of grouped elements, the first of which contains
 * the first elements of the given arrays, the second of which
 * contains the second elements of the given arrays, and so on.
 *
 * @see https://radashi.js.org/reference/array/zip
 * @example
 * ```ts
 * zip(['a', 'b'], [1, 2], [true, false])
 * // [['a', 1, true], ['b', 2, false]]
 * ```
 * @version 12.1.0
 */
export function zip<T1, T2, T3, T4, T5>(
  array1: readonly T1[],
  array2: readonly T2[],
  array3: readonly T3[],
  array4: readonly T4[],
  array5: readonly T5[],
): [T1, T2, T3, T4, T5][]
export function zip<T1, T2, T3, T4>(
  array1: readonly T1[],
  array2: readonly T2[],
  array3: readonly T3[],
  array4: readonly T4[],
): [T1, T2, T3, T4][]
export function zip<T1, T2, T3>(
  array1: readonly T1[],
  array2: readonly T2[],
  array3: readonly T3[],
): [T1, T2, T3][]
export function zip<T1, T2>(
  array1: readonly T1[],
  array2: readonly T2[],
): [T1, T2][]
export function zip<T>(...arrays: (readonly T[])[]): T[][] {
  return unzip(arrays)
}
