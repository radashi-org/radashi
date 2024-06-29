import { Getter, getter } from 'radashi'

/**
 * Max gets the greatest value from a list
 *
 * ```ts
 * max([2, 3, 5]) // => 5
 * max([{ num: 1 }, { num: 2 }], x => x.num) // => { num: 2 }
 * max([{ num: 1 }, { num: 2 }], 'num') // => { num: 2 }
 * ```
 */
export function max(array: readonly [number, ...number[]]): number
export function max(array: readonly number[]): number | null
export function max<T>(array: readonly T[], by: Getter<T, number>): T | null
export function max<T>(array: readonly T[], by?: Getter<T, number>): T | null {
  if (!array) {
    return null
  }
  const get = getter(by)
  return array.reduce((a, b) => (get(b) > get(a) ? b : a))
}
