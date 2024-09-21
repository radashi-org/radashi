/**
 * Max gets the greatest value from a list.
 *
 * @see https://radashi.js.org/reference/array/max
 * @example
 * ```ts
 * max([2, 3, 5]) // => 5
 * max([{ num: 1 }, { num: 2 }], x => x.num) // => { num: 2 }
 * ```
 * @version 12.1.0
 */
export function max(array: readonly [number, ...number[]]): number
export function max(array: readonly number[]): number | null
export function max<T>(
  array: readonly T[],
  getter: (item: T) => number,
): T | null
export function max<T>(
  array: readonly T[],
  getter?: (item: T) => number,
): T | null {
  if (!array || (array.length ?? 0) === 0) {
    return null
  }
  const get = getter ?? ((v: any) => v)
  return array.reduce((a, b) => (get(a) > get(b) ? a : b))
}
