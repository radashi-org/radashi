/**
 * Flip the first two arguments of a function.
 *
 * @see https://radashi.js.org/reference/curry/flip
 * @example
 * ```ts
 * const subtract = (x: number, y: number) => x - y
 *
 * // Equivalent to “y - x”
 * const flippedSubtract = flip(subtract)
 *
 * flippedSubtract(3, 4)
 * // => 1
 * ```
 * @version 12.2.0
 */
export function flip<Args extends any[], Result>(
  fn: (...args: Args) => Result,
): (...args: Flip<Args>) => Result {
  return (arg2, arg1, ...args) => (fn as any)(arg1, arg2, ...args)
}

export type Flip<T extends any[]> = T extends [infer A, infer B, ...infer R]
  ? [B, A, ...R]
  : never
