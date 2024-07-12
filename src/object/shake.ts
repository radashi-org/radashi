/**
 * Removes (shakes out) undefined entries from an object. Optional
 * second argument shakes out values by custom evaluation.
 *
 * @see https://radashi-org.github.io/reference/object/shake
 * @example
 * ```ts
 * const a = { a: 1, b: undefined, c: 3 }
 * shake(a)
 * // => { a: 1, c: 3 }
 * ```
 */
export function shake<T extends object>(
  obj: T,
  filter: (value: T[keyof T]) => boolean = value => value === undefined,
): T {
  if (!obj) {
    return {} as T
  }
  const keys = Object.keys(obj) as (keyof T)[]
  return keys.reduce((acc, key) => {
    if (!filter(obj[key])) {
      acc[key] = obj[key]
    }
    return acc
  }, {} as T)
}
