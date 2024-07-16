import { reduceIterable, type CastIterableItem } from 'radashi'

/**
 * Counts the occurrences of each unique value returned by the `identity`
 * function when applied to each item in the array.
 *
 * @see https://radashi-org.github.io/reference/array/counting
 * @example
 * ```ts
 * counting([1, 2, 3, 4], (n) => n % 2 === 0 ? 'even' : 'odd')
 * // { even: 2, odd: 2 }
 * ```
 */
export function counting<T extends object, K extends keyof any>(
  iterable: T,
  identity: (item: CastIterableItem<T>) => K,
): Record<K, number> {
  if (!iterable) {
    return {} as Record<K, number>
  }
  return reduceIterable(
    iterable,
    (counts, item) => {
      const id = identity(item)
      counts[id] = (counts[id] ?? 0) + 1
      return counts
    },
    {} as Record<K, number>,
  )
}
