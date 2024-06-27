/**
 * Convert an object to a list, mapping each entry into a list item
 */
export function listify<TValue, TKey extends string | number | symbol, KResult>(
  obj: Record<TKey, TValue>,
  toItem: (key: TKey, value: TValue) => KResult
) {
  if (!obj) {
    return []
  }
  const entries = Object.entries(obj)
  if (entries.length === 0) {
    return []
  }
  return entries.reduce((acc, entry) => {
    acc.push(toItem(entry[0] as TKey, entry[1] as TValue))
    return acc
  }, [] as KResult[])
}
