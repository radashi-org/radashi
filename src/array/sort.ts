import { ComparedBy, compare, flip } from 'radashi'

/**
 * Sort an array without modifying it and return the newly sorted
 * value
 *
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
 */
export function sort<T>(
  array: readonly T[],
  by: ComparedBy<T>,
  desc = false,
): T[] {
  if (!array) {
    return []
  }
  const cmp = compare(by)
  return array.slice().sort(desc ? flip(cmp) : cmp)
}
