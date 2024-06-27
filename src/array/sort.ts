/**
 * Sort an array without modifying it and return the newly sorted
 * value
 */
export function sort<T>(
  array: readonly T[],
  getter: (item: T) => number,
  desc = false
) {
  if (!array) return []
  const asc = (a: T, b: T) => getter(a) - getter(b)
  const dsc = (a: T, b: T) => getter(b) - getter(a)
  return array.slice().sort(desc === true ? dsc : asc)
}
