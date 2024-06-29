/**
 * Given two arrays, returns true if any elements intersect.
 *
 * ```ts
 * intersects([1, 2, 3], [4, 5, 6])
 * // false
 *
 * intersects([1, 0, 0], [0, 1], (n) => n > 1)
 * // true
 * ```
 */
export function intersects<T, K>(
  listA: readonly T[],
  listB: readonly T[],
  identity?: (t: T) => K,
): boolean {
  if (!listA || !listB) {
    return false
  }
  if (identity) {
    const known = new Set(listA.map(identity))
    return listB.some(item => known.has(identity(item)))
  }
  return listB.some(item => listA.includes(item))
}
