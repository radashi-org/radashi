/**
 * Linearly interpolates between two numbers.
 *
 * @see https://radashi.js.org/reference/number/lerp
 * @example
 * ```
 * lerp(0, 10, 0.5) // => 5
 * lerp(5, 15, 0.2) // => 7
 * lerp(-10, 10, 0.75) // => 5
 * ```
 * @version 12.2.0
 */
export function lerp(from: number, to: number, amount: number): number {
  return from + (to - from) * amount
}
