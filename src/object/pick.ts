import { type FilteredKeys, filterKey, isArray, type KeyFilter } from 'radashi'

/**
 * Pick a list of properties from an object into a new object.
 *
 * ⚠️ When used with a predicate function, `pick` is potentially
 * unsafe, because of partial type matching performed by TypeScript.
 * If you pass an object with more properties than its TypeScript type
 * has listed, the `value` and `key` parameter types of your callback
 * will be inaccurate.
 *
 * @see https://radashi.js.org/reference/object/pick
 * @example
 * ```ts
 * const a = { a: 1, b: 2, c: 3 }
 *
 * pick(a, ['a', 'c'])
 * // => { a: 1, c: 3 }
 *
 * pick(a, (value, key) => value > 1)
 * // => { b: 2, c: 3 }
 * ```
 * @version 12.1.0
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
