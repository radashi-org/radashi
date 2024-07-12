/**
 * Generates a random integer between min and max. Both min and max
 * are inclusive.
 *
 * @see https://radashi-org.github.io/reference/random/random
 * @example
 * ```ts
 * random(1, 10)
 * // => 5
 * ```
 */
export function random(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
