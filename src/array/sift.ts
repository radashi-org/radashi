import type { Falsy } from 'radashi'

/**
 * Given a list returns a new list with only truthy values.
 *
 * @see https://radashi.js.org/reference/array/sift
 * @example
 * ```ts
 * sift([0, 1, undefined, null, 2, false, 3, ''])
 * // => [1, 2, 3]
 * ```
 * @version 12.1.0
 */
export function sift<T>(array: readonly (T | Falsy)[]): T[] {
  return (array?.filter(x => !!x) as T[]) ?? []
}
