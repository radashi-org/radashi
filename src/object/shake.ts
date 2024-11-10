/**
 * Removes (shakes out) undefined entries from an object. Optional
 * second argument shakes out values by custom evaluation.
 *
 * Note that non-enumerable keys are never shaken out.
 *
 * @see https://radashi.js.org/reference/object/shake
 * @example
 * ```ts
 * const a = { a: 1, b: undefined, c: 3 }
 * shake(a)
 * // => { a: 1, c: 3 }
 * ```
 * @version 12.1.0
 */
export function shake<T extends object>(
  obj: T,
): {
  [K in keyof T]: Exclude<T[K], undefined>
}

export function shake<T extends object>(
  obj: T,
  filter: ((value: unknown) => boolean) | undefined,
): T

export function shake<T extends object>(
  obj: T,
  filter: (value: unknown) => boolean = value => value === undefined,
): T {
  if (!obj) {
    return {} as T
  }
  return (Object.keys(obj) as (keyof T)[]).reduce((acc, key) => {
    if (!filter(obj[key])) {
      acc[key] = obj[key]
    }
    return acc
  }, {} as T)
}
