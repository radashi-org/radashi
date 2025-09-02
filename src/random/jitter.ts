import { random } from 'radashi'

/**
 * Adds a random jitter to a delay value.
 *
 * @see https://radashi.js.org/reference/random/jitter
 *
 * @example
 * ```ts
 * jitter(1000, 0.3)
 * // => 829.9624852801851
 * ```
 */
export const jitter = (delay: number, factor = 0.2): number => {
  if (!Number.isFinite(delay) || delay < 0) {
    return 0
  }
  if (!Number.isFinite(factor) || factor < 0) {
    factor = 0
  }
  const jitter = delay * factor * random(-1, 1)
  return Math.max(0, delay + jitter)
}
