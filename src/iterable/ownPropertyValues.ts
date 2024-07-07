/**
 * Create a generator that yields the values of the object's own
 * properties.
 *
 * #### Use Cases
 * The core value proposition of this function is the TypeScript DX of
 * `Object.values` combined with the lazy nature of generators. For
 * example, it pairs well with `selectFirst` for these reasons.
 *
 * #### TypeScript Limitations
 * Note that the return type isn't entirely accurate, since it
 * includes instance methods that won't actually be yielded.
 * TypeScript currently has no way to omit inherited properties. In
 * addition, non-enumerable properties are not yielded, but TypeScript
 * will say they are. For these reasons, it's recommended to use this
 * only with plain objects being used as maps.
 */
export function* ownPropertyValues<T extends object>(
  iterable: T,
): Generator<PropertyValues<T>, void, undefined> {
  for (const key in iterable) {
    if (Object.prototype.hasOwnProperty.call(iterable, key)) {
      yield iterable[key] as any
    }
  }
}

type PropertyValues<T extends object> = T extends any
  ? T[Extract<keyof T, string | number>]
  : never
