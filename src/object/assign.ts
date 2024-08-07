import { isPlainObject } from 'radashi'

type GenericObject = Record<string | symbol | number, any>
type MergeDeep<A, B> = {
  [K in keyof A | keyof B]: K extends keyof B
    ? K extends keyof A
      ? A[K] extends GenericObject
        ? B[K] extends GenericObject
          ? MergeDeep<A[K], B[K]>
          : B[K]
        : B[K]
      : B[K]
    : K extends keyof A
      ? A[K]
      : never
}

/**
 * Create a copy of the first object, and then merge the second object
 * into it recursively. Only plain objects are recursively merged.
 *
 * @see https://radashi-org.github.io/reference/object/assign
 * @example
 * ```ts
 * const a = { a: 0, b: 2, p: { a: 4 } }
 * const b = { a: 1, c: 3, p: { b: 5 } }
 *
 * assign(a, b)
 * // => { a: 1, b: 2, c: 3, p: { a: 4, b: 5 } }
 * ```
 */
export function assign<X extends GenericObject, Y extends GenericObject>(
  initial: X,
  override: Y,
): MergeDeep<X, Y> {
  if (!initial || !override) {
    return initial ?? override ?? {}
  }
  const proto = Object.getPrototypeOf(initial)
  const merged = proto
    ? { ...initial }
    : Object.assign(Object.create(proto), initial)
  for (const key of Object.keys(override)) {
    merged[key] =
      isPlainObject(initial[key]) && isPlainObject(override[key])
        ? assign(initial[key], override[key])
        : override[key]
  }
  return merged
}
