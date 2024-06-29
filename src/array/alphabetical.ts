import { compare, ComparedBy, flip } from 'radashi'

/**
 * Sort an array without modifying it and return the newly sorted
 * value. Allows for a string sorting value.
 *
 * ```ts
 * alphabetical([
 *   { name: 'b' },
 *   { name: 'a' },
 *   { name: 'c' },
 * ], 'name') // => [{ name: 'a' }, { name: 'b' }, { name: 'c' }]
 * ```
 */
export function alphabetical<T>(
  array: readonly T[],
  by: ComparedBy<T, string>,
  dir: 'asc' | 'desc' = 'asc',
): T[] {
  if (!array) {
    return []
  }
  const cmp = compare(by, (a, b) => a.localeCompare(b))
  return array.slice().sort(dir === 'desc' ? flip(cmp) : cmp)
}
