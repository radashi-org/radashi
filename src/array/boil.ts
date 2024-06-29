/**
 * Go through a list of items, starting with the first item, and
 * comparing with the second. Keep the one you want then compare that
 * to the next item in the list with the same
 *
 * ```ts
 * boil([1, 2, 3, 0], (a, b) => a > b ? a : b) // 3
 * ```
 */
export function boil<T>(
  array: readonly T[],
  compareFunc: (a: T, b: T) => T,
): T | null {
  if (!array || (array.length ?? 0) === 0) {
    return null
  }
  return array.reduce(compareFunc)
}
