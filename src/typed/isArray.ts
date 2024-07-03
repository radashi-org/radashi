import { ExtractNotAny } from 'radashi'

export const isArray = Array.isArray as <Input>(
  value: Input,
) => value is readonly any[] extends ExtractNotAny<Input, readonly any[]>
  ? Extract<Input, readonly any[]>
  : any[] extends ExtractNotAny<Input, any[]>
    ? Extract<Input, any[]>
    : unknown[] extends Input
      ? unknown[]
      : never
