/**
 * Convert an array to a dictionary by mapping each item into a
 * dictionary key & value
 */
export function objectify<T, Key extends string | number | symbol, Value = T>(
  array: readonly T[],
  getKey: (item: T) => Key,
  getValue: (item: T) => Value = item => item as unknown as Value
): Record<Key, Value> {
  return array.reduce((acc, item) => {
    acc[getKey(item)] = getValue(item)
    return acc
  }, {} as Record<Key, Value>)
}
