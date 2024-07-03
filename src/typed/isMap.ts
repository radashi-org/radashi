import { type ExtractNotAny, isTagged } from 'radashi'

export function isMap<Input>(
  value: Input,
): value is ReadonlyMap<any, any> extends ExtractNotAny<
  Input,
  ReadonlyMap<any, any>
>
  ? Extract<Input, ReadonlyMap<any, any>>
  : Map<any, any> extends ExtractNotAny<Input, Map<any, any>>
    ? Extract<Input, Map<any, any>>
    : Map<unknown, unknown> extends Input
      ? Map<unknown, unknown>
      : never

export function isMap(value: unknown): boolean {
  return isTagged(value, '[object Map]')
}
