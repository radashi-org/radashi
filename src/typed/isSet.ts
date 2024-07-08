import { type ExtractNotAny, isTagged } from 'radashi'

export function isSet<Input>(
  value: Input,
): value is ReadonlySet<any> extends ExtractNotAny<Input, ReadonlySet<any>>
  ? Extract<Input, ReadonlySet<unknown>>
  : Set<any> extends ExtractNotAny<Input, Set<any>>
    ? Extract<Input, Set<unknown>>
    : Set<unknown> extends Input
      ? Set<unknown>
      : never

export function isSet(value: unknown): boolean {
  return isTagged(value, '[object Set]')
}
