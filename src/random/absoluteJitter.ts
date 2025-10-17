/**
 * Returns a value randomly jittered by an absolute offset.
 *
 * @see https://radashi.js.org/reference/random/absoluteJitter
 * @example
 * ```ts
 * const result = absoluteJitter(100, 5)
 * result >= 95 && result <= 105
 * // => true
 * ```
 * @version 12.7.0
 */
export function absoluteJitter(base: number, offset: number): number {
  return base + offset * (2 * Math.random() - 1)
}
