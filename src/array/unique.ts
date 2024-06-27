/**
 * Given a list of items returns a new list with only unique items.
 * Accepts an optional identity function to convert each item in the
 * list to a comparable identity value
 *
 * ```ts
 * unique([1, 1, 2, 2]) // => [1, 2]
 * unique([1, 2, 3], (n) => n % 2) // => [1, 2]
 * ```
 */
export function unique<T, K = T>(
  array: readonly T[],
  toKey?: (item: T) => K
): T[] {
  if (toKey) {
    const keys = new Set<K>()
    return array.reduce((acc, item) => {
      const key = toKey(item)
      if (!keys.has(key)) {
        keys.add(key)
        acc.push(item)
      }
      return acc
    }, [] as T[])
  }
  return [...new Set(array)]
}
