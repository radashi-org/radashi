/**
 * Returns all items from the first list that do not exist in the
 * second list.
 *
 * @see https://radashi.js.org/reference/array/diff
 * @example
 * ```ts
 * diff([1, 2, 3, 4], [2, 4])
 * // [1, 3]
 *
 * diff([{a:1}, {a:2}, {a:3}], [{a:2}, {a:4}], (n) => n.a)
 * // [{a:1}, {a:3}]
 * ```
 * @version 12.1.0
 */
export function diff<T>(
  root: readonly T[],
  other: readonly T[],
  identity: (item: T) => string | number | symbol = (t: T) =>
    t as unknown as string | number | symbol,
): T[] {
  if (!root?.length && !other?.length) {
    return []
  }
  if (root?.length === undefined) {
    return [...other]
  }
  if (!other?.length) {
    return [...root]
  }
  const bKeys = other.reduce(
    (acc, item) => {
      acc[identity(item)] = true
      return acc
    },
    {} as Record<string | number | symbol, boolean>,
  )
  return root.filter(a => !bKeys[identity(a)])
}
