/**
 * Counts the occurrences of each unique value returned by the `identity`
 * function when applied to each item in the array.
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
): Record<TId, number> {
  const counts = Object.create(null) as Record<TId, number>
  if (!array) {
    return counts
  }
  for (const item of array) {
    const id = identity(item)
    counts[id] = (counts[id] ?? 0) + 1
  }
  return counts
}
