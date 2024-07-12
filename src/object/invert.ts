/**
 * Returns a new object whose keys are the values of the given object
 * and its values are the keys of the given object.
 *
 * @see https://radashi-org.github.io/reference/object/invert
 * @example
 * ```ts
 * const a = { a: 1, b: 2, c: 3 }
 * invert(a)
 * // => { 1: 'a', 2: 'b', 3: 'c' }
 * ```
 */
export function invert<
  TKey extends string | number | symbol,
  TValue extends string | number | symbol,
>(obj: Record<TKey, TValue>): Record<TValue, TKey> {
  if (!obj) {
    return {} as Record<TValue, TKey>
  }
  const keys = Object.keys(obj) as TKey[]
  return keys.reduce(
    (acc, key) => {
      acc[obj[key]] = key
      return acc
    },
    {} as Record<TValue, TKey>,
  )
}
