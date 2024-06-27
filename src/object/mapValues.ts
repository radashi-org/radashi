/**
 * Map over all the keys to create a new object
 */
export function mapValues<
  TValue,
  TKey extends string | number | symbol,
  TNewValue,
>(
  obj: { [K in TKey]: TValue },
  mapFunc: (value: TValue, key: TKey) => TNewValue,
): { [K in TKey]: TNewValue }

// This overload exists to support cases where `obj` is a partial
// object whose values are never undefined when the key is also
// defined. For example:
//   { [key: string]?: number } versus { [key: string]: number | undefined }
export function mapValues<
  TValue,
  TKey extends string | number | symbol,
  TNewValue,
>(
  obj: { [K in TKey]?: TValue },
  mapFunc: (value: TValue, key: TKey) => TNewValue,
): { [K in TKey]?: TNewValue }

export function mapValues<
  TValue,
  TKey extends string | number | symbol,
  TNewValue,
>(
  obj: { [K in TKey]?: TValue },
  mapFunc: (value: TValue, key: TKey) => TNewValue,
): Record<TKey, TNewValue> {
  const keys = Object.keys(obj) as TKey[]
  return keys.reduce((acc, key) => {
    acc[key] = mapFunc(obj[key]!, key)
    return acc
  }, {} as Record<TKey, TNewValue>)
}
