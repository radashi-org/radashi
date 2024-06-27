/**
 * Given two arrays, returns true if any elements intersect
 */
export function intersects<T, K>(
  listA: readonly T[],
  listB: readonly T[],
  identity?: (t: T) => K
): boolean {
  if (!listA || !listB) return false
  if (identity) {
    const known = new Set(listA.map(identity))
    return listB.some(item => known.has(identity(item)))
  }
  return listB.some(item => listA.includes(item))
}
