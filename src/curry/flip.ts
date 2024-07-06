export function flip<Args extends any[], Result>(
  fn: (...args: Args) => Result,
): (...args: Flip<Args>) => Result {
  return (arg2, arg1, ...args) => (fn as any)(arg1, arg2, ...args)
}

export type Flip<T extends any[]> = T extends [infer A, infer B, ...infer R]
  ? [B, A, ...R]
  : never
