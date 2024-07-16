import { searchIterable, type CastIterableItem } from 'radashi'

/**
 * Select performs a find + map operation, short-circuiting on the first
 * element that satisfies the prescribed condition. If condition is omitted,
 * will select the first mapped value which is non-nullish.
 *
 * @see https://radashi-org.github.io/reference/array/selectFirst
 * @example
 * ```ts
 * selectFirst(
 *   [1, 2, 3, 4],
 *   x => x * x,
 *   x => x > 2
 * )
 * // => 9
 * ```
 */
export function selectFirst<T extends object, U>(
  iterable: T,
  mapper: (item: CastIterableItem<T>, index: number) => U,
  condition?: (item: CastIterableItem<T>, index: number) => boolean,
): U | undefined {
  if (!iterable) {
    return undefined
  }
  let mapped: U | undefined
  searchIterable(iterable, (item, index) => {
    if (!condition) {
      mapped = mapper(item, index)
      if (mapped != null) {
        return true
      }
    } else if (condition(item, index)) {
      mapped = mapper(item, index)
      return true
    }
  })
  return mapped ?? undefined
}
