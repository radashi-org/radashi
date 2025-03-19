/**
 * Counts the occurrences of each unique value returned by the
 * `identity` function when applied to each item in the array.
 *
 * If no occurrences are found, the key will not be present in the
 * returned object.
 *
 * @see https://radashi.js.org/reference/array/counting
 * @example
 * ```ts
 * counting([1, 2, 3, 4], (n) => n % 2 === 0 ? 'even' : 'odd')
 * // { even: 2, odd: 2 }
 * ```
 * @version 12.1.0
 */
export function counting<T, TId extends string | number | symbol>(
  array: readonly T[],
  identity: (item: T) => TId,
): Partial<Record<TId, number>> {
  return array.reduce(
    (acc, item) => {
      const id = identity(item)
      acc[id] = (acc[id] ?? 0) + 1
      return acc
    },
    {} as Partial<Record<TId, number>>,
  )
}
