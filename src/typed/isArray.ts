import type { ExtractNotAny } from 'radashi'

export const isArray = Array.isArray as <Input>(
  value: Input,
) => value is [ExtractNotAny<Input, readonly any[]>] extends [readonly any[]]
  ? Extract<Input, readonly any[]>
  : [ExtractNotAny<Input, any[]>] extends [any[]]
    ? Extract<Input, any[]>
    : unknown[] extends Input
      ? unknown[]
      : never
