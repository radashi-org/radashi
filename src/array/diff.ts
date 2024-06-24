/**
 * Returns all items from the first list that do not exist in the
 * second list.
 */
export const diff = <T>(
  root: readonly T[],
  other: readonly T[],
  identity: (item: T) => string | number | symbol = (t: T) =>
    t as unknown as string | number | symbol
): T[] => {
  if (!root?.length && !other?.length) return []
  if (root?.length === undefined) return [...other]
  if (!other?.length) return [...root]
  const bKeys = other.reduce((acc, item) => {
    acc[identity(item)] = true
    return acc
  }, {} as Record<string | number | symbol, boolean>)
  return root.filter(a => !bKeys[identity(a)])
}
