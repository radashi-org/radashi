/**
 * Returns a value randomly jittered by a proportion of the base value.
 *
 * @see https://radashi.js.org/reference/random/proportionalJitter
 * @example
 * ```ts
 * const result = proportionalJitter(100, 0.25)
 * result >= 75 && result <= 125
 * // => true
 * ```
 * @version 12.7.0
 */
export function proportionalJitter(base: number, factor: number): number {
  return base * (1 - factor * (2 * Math.random() - 1))
}
