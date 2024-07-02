export function mapify<T, Key, Value = T>(
  array: readonly T[],
  getKey: (item: T) => Key,
  getValue: (item: T) => Value = item => item as unknown as Value,
): Map<Key, Value> {
	const map: Map<Key, Value> = new Map();
	array.forEach(item => map.set(getKey(item), getValue(item)))
  return map;
}
