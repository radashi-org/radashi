import { isTagged, type StrictExtract } from 'radashi'

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
