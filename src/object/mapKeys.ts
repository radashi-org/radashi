/**
 * Map over all the keys of an object to return a new object
 */
export function mapKeys<
  TValue,
  TKey extends string | number | symbol,
  TNewKey extends string | number | symbol,
>(
  obj: Record<TKey, TValue>,
  mapFunc: (key: TKey, value: TValue) => TNewKey,
): Record<TNewKey, TValue> {
  const keys = Object.keys(obj) as TKey[]
  return keys.reduce((acc, key) => {
    acc[mapFunc(key as TKey, obj[key])] = obj[key]
    return acc
  }, {} as Record<TNewKey, TValue>)
}
