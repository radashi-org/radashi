/**
 * Select performs a find + map operation, short-circuiting on the first
 * element that satisfies the prescribed condition. If condition is omitted,
 * will select the first mapped value which is non-nullish.
 *
 * @see https://radashi.js.org/reference/array/selectFirst
 * @example
 * ```ts
 * selectFirst(
 *   [1, 2, 3, 4],
 *   x => x * x,
 *   x => x > 2
 * )
 * // => 9
 * ```
 * @version 12.2.0
 */
export function selectFirst<T, U>(
  array: readonly T[],
  mapper: (item: T, index: number) => U,
  condition?: (item: T, index: number) => boolean,
): U | undefined {
  if (!array) {
    return undefined
  }
  let foundIndex = -1
  const found = array.find((item, index) => {
    foundIndex = index
    return condition ? condition(item, index) : mapper(item, index) != null
  })
  return found === undefined ? undefined : mapper(found, foundIndex)
}
