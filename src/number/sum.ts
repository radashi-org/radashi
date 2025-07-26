/**
 * Add up numbers related to an array in 1 of 2 ways:
 * 1. Sum all numbers in an array of numbers
 * 2. Sum all numbers returned by a callback function that maps
 *    each item in an array to a number.
 *
 * @see https://radashi.js.org/reference/array/sum
 * @example
 * ```ts
 * sum([1, 2, 3])
 * // => 6
 *
 * sum([
 *   {value: 1},
 *   {value: 2},
 *   {value: 3}
 * ], (item) => item.value)
 * // => 6
 *
 * sum([true, false, true], (item) => item ? 1 : 0)
 * // => 2
 * ```
 * @version 12.1.0
 */
export function sum(array: readonly number[]): number
export function sum<T>(array: readonly T[], fn: (item: T) => number): number
export function sum<T>(
  array: readonly any[],
  fn?: (item: T) => number,
): number {
  return (array || []).reduce((acc, item) => acc + (fn ? fn(item) : item), 0)
}
