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
export function sort<T>(
  array: readonly T[],
  getter: (item: T) => number,
  desc = false,
): T[] {
  if (!array) {
    return []
  }
  const asc = (a: T, b: T) => getter(a) - getter(b)
  const dsc = (a: T, b: T) => getter(b) - getter(a)
  return array.slice().sort(desc === true ? dsc : asc)
}
