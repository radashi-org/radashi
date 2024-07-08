/**
 * Linearly interpolates between two numbers.
 *
 * ```
 * lerp(0, 10, 0.5) // => 5
 * lerp(5, 15, 0.2) // => 7
 * lerp(-10, 10, 0.75) // => 5
 * ```
 */
export function lerp(from: number, to: number, amount: number): number {
  return from + (to - from) * amount
}
