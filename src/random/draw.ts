import { random } from 'radashi'

/**
 * “Draw” a random item from an array. The item is not removed from
 * the array. Returns `null` if the array is empty.
 *
 * @see https://radashi.js.org/reference/random/draw
 * @example
 * ```ts
 * const numbers = [1, 2, 3]
 *
 * draw(numbers)
 * // => 2
 * numbers
 * // => [1, 2, 3]
 * ```
 * @version 12.1.0
 */
export function draw<const T extends readonly any[]>(
  array: T,
): T extends readonly [any, ...any[]] ? T[number] : T[number] | null {
  const max = array.length
  if (max === 0) {
    return null as any
  }
  const index = random(0, max - 1)
  return array[index]
}
