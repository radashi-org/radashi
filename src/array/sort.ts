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
  const direction = desc ? -1 : 1
  return array
    .slice()
    .sort((a, b) => (getter(a) - getter(b)) * direction) as SortArray<T>
}

/**
 * The return type of the `sort` function. Tuple types are preserved.
 */
export type SortArray<T extends readonly any[]> = T extends readonly []
  ? []
  : T extends readonly [any, ...infer TRest]
    ? [T[number], ...SortArrayRest<T[number], TRest>]
    : T[number][]

type SortArrayRest<TElement, T extends readonly any[]> = T extends readonly [
  any,
  ...infer TRest,
]
  ? [TElement, ...SortArrayRest<TElement, TRest>]
  : T extends readonly []
    ? []
    : TElement[]
