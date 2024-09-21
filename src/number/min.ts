/**
 * Min gets the smallest value from a list.
 *
 * @see https://radashi.js.org/reference/array/min
 * @example
 * ```ts
 * min([1, 2, 3, 4]) // => 1
 * min([{ num: 1 }, { num: 2 }], x => x.num) // => { num: 1 }
 * ```
 * @version 12.1.0
 */
export function min(array: readonly [number, ...number[]]): number
export function min(array: readonly number[]): number | null
export function min<T>(
  array: readonly T[],
  getter: (item: T) => number,
): T | null
export function min<T>(
  array: readonly T[],
  getter?: (item: T) => number,
): T | null {
  if (!array || (array.length ?? 0) === 0) {
    return null
  }
  const get = getter ?? ((v: any) => v)
  return array.reduce((a, b) => (get(a) < get(b) ? a : b))
}
