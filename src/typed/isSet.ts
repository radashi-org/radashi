import { isTagged, type StrictExtract } from 'radashi'

/**
 * Checks if the given value is a Set.
 *
 * Instances from [other realms][1] are also supported.
 *
 * [1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof#instanceof_and_multiple_realms
 *
 * @see https://radashi.js.org/reference/typed/isSet
 * @example
 * ```ts
 * isSet(new Set([1, 2, 3])) // => true
 * isSet(new Map([1, 2, 3])) // => false
 * ```
 * @version 12.2.0
 */
export function isSet<Input>(value: Input): value is ExtractSet<Input> {
  return isTagged(value, '[object Set]')
}

/**
 * An absurdly complicated but accurate type for extracting Set types.
 *
 * It's like `Extract<T, Set<any>>` but better with edge cases.
 */
export type ExtractSet<T> = T extends any
  ? [StrictExtract<T, ReadonlySet<unknown>>] extends [ReadonlySet<unknown>]
    ? Extract<T, ReadonlySet<unknown>>
    : [StrictExtract<T, Set<unknown>>] extends [Set<unknown>]
      ? Extract<T, Set<unknown>>
      : Set<unknown> extends T
        ? Set<unknown>
        : never
  : never
