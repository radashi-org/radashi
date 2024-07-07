import { type FilteredKeys, filterKey, type KeyFilter } from 'radashi'

/**
 * Create a generator that yields the names of the object's own
 * properties.
 *
 * #### Use Cases
 * The core value proposition of this function is the TypeScript DX of
 * `Object.keys` combined with the lazy nature of generators. For
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
export function* ownPropertyNames<
  T extends object,
  F extends KeyFilter<T, keyof T> | null | undefined = undefined,
>(obj: T, filter?: F): Generator<PropertyNames<T, F>, void, undefined> {
  for (const key in obj) {
    if (filterKey(obj, key, filter)) {
      yield key as any
    }
  }
}

type PropertyNames<
  T extends object,
  F extends KeyFilter<T, keyof T> | null | undefined,
> = T extends any
  ? FilteredKeys<T, F> extends infer K
    ? K extends string
      ? K
      : K extends number
        ? `${K}`
        : never
    : never
  : never
