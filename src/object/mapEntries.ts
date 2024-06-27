/**
 * Map over all the keys to create a new object
 */
export function mapEntries<
  TKey extends string | number | symbol,
  TValue,
  TNewKey extends string | number | symbol,
  TNewValue,
>(
  obj: Record<TKey, TValue>,
  toEntry: (key: TKey, value: TValue) => [TNewKey, TNewValue],
): Record<TNewKey, TNewValue> {
  if (!obj) {
    return {} as Record<TNewKey, TNewValue>
  }
  return Object.entries(obj).reduce(
    (acc, [key, value]) => {
      const [newKey, newValue] = toEntry(key as TKey, value as TValue)
      acc[newKey] = newValue
      return acc
    },
    {} as Record<TNewKey, TNewValue>,
  )
}
