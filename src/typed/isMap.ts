import { isTagged, type StrictExtract } from 'radashi'

export function isMap<Input>(value: Input): value is ExtractMap<Input> {
  return isTagged(value, '[object Map]')
}

/**
 * An absurdly complicated but accurate type for extracting Map types.
 */
export type ExtractMap<Input> = Input extends any
  ? [StrictExtract<Input, ReadonlyMap<unknown, unknown>>] extends [
      ReadonlyMap<unknown, unknown>,
    ]
    ? Extract<Input, ReadonlyMap<unknown, unknown>>
    : [StrictExtract<Input, Map<unknown, unknown>>] extends [
          Map<unknown, unknown>,
        ]
      ? Extract<Input, Map<unknown, unknown>>
      : Map<unknown, unknown> extends Input
        ? Map<unknown, unknown>
        : never
  : never
