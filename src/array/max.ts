import { boil } from 'radashi'

/**
 * Max gets the greatest value from a list
 *
 * ```ts
 * max([2, 3, 5]) // => 5
 * max([{ num: 1 }, { num: 2 }], x => x.num) // => { num: 2 }
 * ```
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
  const get = getter ?? ((v: any) => v)
  return boil(array, (a, b) => (get(a) > get(b) ? a : b))
}
