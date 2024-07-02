type Falsy = null | undefined | false | '' | 0 | 0n

/**
 * Given a list returns a new list with only truthy values
 *
 * ```ts
 * sift([0, 1, undefined, null, 2, false, 3, ''])
 * // => [1, 2, 3]
 * ```
 */
export function sift<T>(array: readonly (T | Falsy)[]): T[] {
  return (array?.filter(x => !!x) as T[]) ?? []
}
