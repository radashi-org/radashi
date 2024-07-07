import { searchIterable, type ToIterableItem } from 'radashi'

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
  mapper: (item: ToIterableItem<T>, index: number) => U,
  condition?: (item: ToIterableItem<T>, index: number) => boolean,
): U | undefined {
  if (!iterable) {
    return undefined
  }
  let found: boolean | undefined
  let foundValue: U
  let lastItem: ToIterableItem<T>
  let lastIndex: number
  searchIterable(
    iterable,
    condition
      ? (item, index) =>
          (found = condition((lastItem = item), (lastIndex = index)))
      : (item, index) =>
          (found = (foundValue = mapper(item, (lastIndex = index))) != null),
  )
  return found
    ? condition
      ? mapper(lastItem!, lastIndex!)
      : foundValue!
    : undefined
}
