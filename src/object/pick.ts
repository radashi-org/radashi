import { type FilteredKeys, filterKey, isArray, type KeyFilter } from 'radashi'

/**
 * Pick a list of properties from an object into a new object
 */
export function pick<T extends object, F extends KeyFilter<T, keyof T>>(
  obj: T,
  filter: F,
): Pick<T, FilteredKeys<T, F>>

export function pick<T extends object>(
  obj: T,
  filter: KeyFilter<T, keyof T> | null,
) {
  if (!obj) {
    return {}
  }
  let keys: (keyof T)[] = filter as any
  if (isArray(filter)) {
    filter = null
  } else {
    keys = Reflect.ownKeys(obj) as (keyof T)[]
  }
  return keys.reduce((acc, key) => {
    if (filterKey(obj, key, filter)) {
      acc[key] = obj[key]
    }
    return acc
  }, {} as T)
}
