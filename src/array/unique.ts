/**
 * Given a list of items returns a new list with only unique items.
 * Accepts an optional identity function to convert each item in the
 * list to a comparable identity value
 */
export const unique = <T, K extends string | number | symbol>(
  array: readonly T[],
  toKey?: (item: T) => K
): T[] => {
  const valueMap = array.reduce((acc, item) => {
    const key = toKey ? toKey(item) : (item as any as string | number | symbol)
    if (acc[key]) return acc
    acc[key] = item
    return acc
  }, {} as Record<string | number | symbol, T>)
  return Object.values(valueMap)
}
