/**
 * Given a list of items returns a new list with only unique items.
 * Accepts an optional identity function to convert each item in the
 * list to a comparable identity value
 */
export const unique = <T, K = T>(
  array: readonly T[],
  toKey?: (item: T) => K
): T[] => {
  const known = new Set<T | K>()
  return array.reduce((acc, item) => {
    const key = toKey ? toKey(item) : item
    if (!known.has(key)) {
      known.add(key)
      acc.push(item)
    }
    return acc
  }, [] as T[])
}
