import { reduceIterable, type CastIterableItem } from 'radashi'

/**
 * Select performs a filter and a mapper inside of a reduce, only
 * iterating the list one time. If condition is omitted, will
 * select all mapped values that are non-nullish.
 *
 * @see https://radashi-org.github.io/reference/array/select
 * @example
 * ```ts
 * select(
 *   [1, 2, 3, 4],
 *   x => x * x,
 *   x => x > 2
 * )
 * // => [9, 16]
 * ```
 */
export function select<T extends object, U>(
  iterable: T,
  mapper: (item: CastIterableItem<T>, index: number) => U | null | undefined,
): U[]

export function select<T extends object, U>(
  iterable: T,
  mapper: (item: CastIterableItem<T>, index: number) => U,
  condition?: (item: CastIterableItem<T>, index: number) => boolean,
): U[]

export function select<T extends object, U>(
  iterable: T,
  mapper: (item: CastIterableItem<T>, index: number) => U,
  condition?: (item: CastIterableItem<T>, index: number) => boolean,
): U[] {
  if (!iterable) {
    return []
  }
  return reduceIterable(
    iterable,
    condition
      ? (acc, item, index) => {
          if (condition(item, index)) {
            acc.push(mapper(item, index))
          }
          return acc
        }
      : (acc, item, index) => {
          const mapped = mapper(item, index)
          if (mapped != null) {
            acc.push(mapped)
          }
          return acc
        },
    [] as U[],
  )
}
