import { isTagged, type StrictExtract } from 'radashi'

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
