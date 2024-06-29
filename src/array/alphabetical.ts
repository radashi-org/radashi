/**
 * Sort an array without modifying it and return the newly sorted
 * value. Allows for a string sorting value.
 */
export function alphabetical<T>(
  array: readonly T[],
  getter: (item: T) => string,
  dir: 'asc' | 'desc' = 'asc',
): T[] {
  if (!array) {
    return []
  }
  const asc = (a: T, b: T) => `${getter(a)}`.localeCompare(getter(b))
  const dsc = (a: T, b: T) => `${getter(b)}`.localeCompare(getter(a))
  return array.slice().sort(dir === 'desc' ? dsc : asc)
}
