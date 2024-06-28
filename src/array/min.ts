import { Getter, getter } from 'radashi'

/**
 * Min gets the smallest value from a list
 *
 * ```ts
 * min([1, 2, 3, 4]) // => 1
 * min([{ num: 1 }, { num: 2 }], x => x.num) // => { num: 1 }
 * min([{ num: 1 }, { num: 2 }], 'num') // => { num: 1 }
 * ```
 */
export function min(array: readonly [number, ...number[]]): number
export function min(array: readonly number[]): number | null
export function min<T>(array: readonly T[], by: Getter<T, number>): T | null
export function min<T>(array: readonly T[], by?: Getter<T, number>): T | null {
  if (!array) {
    return null
  }
  const get = getter(by)
  return array.reduce((a, b) => (get(b) < get(a) ? b : a))
}
