export const isArray = Array.isArray as <Input>(
  value: Input,
) => value is readonly any[] extends Extract<Input, readonly any[]>
  ? Extract<Input, readonly any[]>
  : any[] extends Extract<Input, any[]>
    ? Extract<Input, any[]>
    : unknown[] extends Input
      ? unknown[]
      : never
