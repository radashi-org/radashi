/**
 * Sort an array without modifying it and return the newly sorted
 * value. Allows for a string sorting value.
 *
 * @see https://radashi.js.org/reference/array/alphabetical
 * @version 12.1.0
 */
export function alphabetical<T>(
  array: readonly T[],
  getter: (item: T) => string,
  direction: 'asc' | 'desc' = 'asc',
): T[] {
  if (!array) {
    return []
  }
  const asc = (a: T, b: T) => `${getter(a)}`.localeCompare(getter(b))
  const dsc = (a: T, b: T) => `${getter(b)}`.localeCompare(getter(a))
  return array.slice().sort(direction === 'desc' ? dsc : asc)
}
