import type { StrictExtract } from 'radashi'

export const isArray = Array.isArray as <Input>(
  value: Input,
) => value is ExtractArray<Input>

export type ExtractArray<Input> = Input extends any
  ? [StrictExtract<Input, readonly any[]>] extends [readonly any[]]
    ? Extract<Input, readonly any[]>
    : [StrictExtract<Input, any[]>] extends [any[]]
      ? Extract<Input, any[]>
      : unknown[] extends Input
        ? unknown[]
        : never
  : never
