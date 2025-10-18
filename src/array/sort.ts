import { identity } from 'radashi'

/**
 * Sort an array without modifying it and return the newly sorted
 * value.
 *
 * @see https://radashi.js.org/reference/array/sort
 * @example
 * ```ts
 * const fish = [
 *   { name: 'Marlin', weight: 105 },
 *   { name: 'Bass', weight: 8 },
 *   { name: 'Trout', weight: 13 }
 * ]
 *
 * sort(fish, f => f.weight) // => [Bass, Trout, Marlin]
 * sort(fish, f => f.weight, true) // => [Marlin, Trout, Bass]
 * ```
 * @version 12.1.0
 */
export function sort<const T extends readonly any[]>(
  array: T,
  getter: (item: T[number]) => number = identity,
  desc = false,
): SortArray<T> {
  if (!array) {
    return [] as SortArray<T>
  }
  const asc = (a: T, b: T) => getter(a) - getter(b)
  const dsc = (a: T, b: T) => getter(b) - getter(a)
  return array.slice().sort(desc === true ? dsc : asc) as SortArray<T>
}

/**
 * The return type of the `sort` function. Tuple types are preserved.
 */
export type SortArray<T extends readonly any[]> = T extends readonly [
  ...infer TElement,
]
  ? { [K in keyof TElement]: T[number] }
  : []
