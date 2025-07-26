import { isTagged, type StrictExtract } from 'radashi'

/**
 * Return true if the given value is a Map.
 *
 * Instances from [other realms][1] are also supported.
 *
 * [1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof#instanceof_and_multiple_realms
 *
 * @see https://radashi.js.org/reference/typed/isMap
 * @example
 * ```ts
 * isMap(new Map()) // => true
 * isMap(new Set()) // => false
 * ```
 * @version 12.2.0
 */
export function isMap<Input>(value: Input): value is ExtractMap<Input> {
  return isTagged(value, '[object Map]')
}

/**
 * An absurdly complicated but accurate type for extracting Map types.
 *
 * It's like `Extract<T, Map<any, any>>` but better with edge cases.
 */
export type ExtractMap<T> = T extends any
  ? [StrictExtract<T, ReadonlyMap<unknown, unknown>>] extends [
      ReadonlyMap<unknown, unknown>,
    ]
    ? Extract<T, ReadonlyMap<unknown, unknown>>
    : [StrictExtract<T, Map<unknown, unknown>>] extends [Map<unknown, unknown>]
      ? Extract<T, Map<unknown, unknown>>
      : Map<unknown, unknown> extends T
        ? Map<unknown, unknown>
        : never
  : never
