/**
 * Sum all numbers in an array. Optionally provide a function to
 * convert objects in the array to number values.
 *
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
 * ```
 */
export function sum<T extends number>(array: readonly T[]): number
export function sum<T extends object>(
  array: readonly T[],
  fn: (item: T) => number,
): number
export function sum<T extends object | number>(
  array: readonly any[],
  fn?: (item: T) => number,
): number {
  return (array || []).reduce((acc, item) => acc + (fn ? fn(item) : item), 0)
}
