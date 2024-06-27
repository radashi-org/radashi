export function counting<T, TId extends string | number | symbol>(
  list: readonly T[],
  identity: (item: T) => TId
): Record<TId, number> {
  if (!list) return {} as Record<TId, number>
  return list.reduce((acc, item) => {
    const id = identity(item)
    acc[id] = (acc[id] ?? 0) + 1
    return acc
  }, {} as Record<TId, number>)
}
