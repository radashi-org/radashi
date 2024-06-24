/**
 * Map over all the keys to create a new object
 */
export const mapValues = <
  TValue,
  TKey extends string | number | symbol,
  TNewValue
>(
  obj: Record<TKey, TValue>,
  mapFunc: (value: TValue, key: TKey) => TNewValue
): Record<TKey, TNewValue> => {
  const keys = Object.keys(obj) as TKey[]
  return keys.reduce((acc, key) => {
    acc[key] = mapFunc(obj[key], key)
    return acc
  }, {} as Record<TKey, TNewValue>)
}
