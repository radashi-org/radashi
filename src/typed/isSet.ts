import { isTagged, type StrictExtract } from 'radashi'

export function isSet<Input>(value: Input): value is ExtractSet<Input> {
  return isTagged(value, '[object Set]')
}

export type ExtractSet<Input> = Input extends any
  ? [StrictExtract<Input, ReadonlySet<unknown>>] extends [ReadonlySet<unknown>]
    ? Extract<Input, ReadonlySet<unknown>>
    : [StrictExtract<Input, Set<unknown>>] extends [Set<unknown>]
      ? Extract<Input, Set<unknown>>
      : Set<unknown> extends Input
        ? Set<unknown>
        : never
  : never
