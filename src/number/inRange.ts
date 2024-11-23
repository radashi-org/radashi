/**
 * Checks if the given number is between zero (0) and the ending
 * number. 0 is inclusive.
 *
 * * Numbers can be negative or positive.
 * * Ending number is exclusive.
 *
 * @see https://radashi.js.org/reference/number/inRange
 * @example
 * ```ts
 * inRange(5, 10) // => true
 * inRange(-1, 10) // => false
 * inRange(10, 10) // => false
 * ```
 * @version 12.1.0
 */
export function inRange(number: number, end: number): boolean

/**
 * Checks if the given number is between two numbers.
 *
 * * Numbers can be negative or positive.
 * * Starting number is inclusive.
 * * Ending number is exclusive.
 * * The start and the end of the range can be ascending OR descending
 *   order.
 *
 * @see https://radashi.js.org/reference/number/inRange
 * @example
 * ```ts
 * inRange(5, 0, 10) // => true
 * inRange(-1, 0, 10) // => false
 * inRange(10, 0, 10) // => false
 * ```
 */
export function inRange(number: number, start: number, end: number): boolean
export function inRange(number: number, start: number, end?: number): boolean {
  const isTypeSafe =
    typeof number === 'number' &&
    typeof start === 'number' &&
    (typeof end === 'undefined' || typeof end === 'number')

  if (!isTypeSafe) {
    return false
  }

  if (typeof end === 'undefined') {
    end = start
    start = 0
  }

  return number >= Math.min(start, end) && number < Math.max(start, end)
}
