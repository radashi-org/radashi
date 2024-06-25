import { boil } from 'radashi'

/**
 * Min gets the smallest value from a list
 *
 * @example
 * min([1, 2, 3, 4]) == 1
 * min([{ num: 1 }, { num: 2 }], x => x.num) == { num: 1 }
 */
export function min(array: readonly [number, ...number[]]): number
export function min(array: readonly number[]): number | null
export function min<T>(
  array: readonly T[],
  getter: (item: T) => number
): T | null
export function min<T>(
  array: readonly T[],
  getter?: (item: T) => number
): T | null {
  const get = getter ?? ((v: any) => v)
  return boil(array, (a, b) => (get(a) < get(b) ? a : b))
}
