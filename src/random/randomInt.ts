/**
 * Generates a random integer between `min` and `max`. The range is
 * inclusive on both ends, so `randomInt(0, 1)` will return 0 or 1.
 *
 * Note: This uses `Math.random` for randomness, so it's not
 * cryptographically secure. It's also biased (some results are more
 * likely than others). Most of the time, this won't be a problem.
 *
 * @see https://radashi-org.github.io/reference/random/randomInt
 * @example
 * ```ts
 * randomInt(0, 1) // 0
 * randomInt(0, 1) // 1
 * randomInt(0, 1) // 0
 * ```
 */
export function randomInt(min: number, max: number): number {
  return min <= max
    ? Math.floor(min + (1 + max - min) * Math.random())
    : randomInt(max, min)
}

/**
 * @deprecated Use `randomInt` instead.
 */
export const random: typeof randomInt = randomInt
