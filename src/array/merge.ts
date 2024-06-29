/**
 * Given two arrays of the same type, iterate the first list and
 * replace items matched by the `matcher` function in the first place.
 * The given arrays are never modified.
 *
 * ```ts
 * merge(
 *   [{id: 1}, {id: 2}],
 *   [{id: 3}, {id: 1, name: 'John'}],
 *   (obj) => obj.id
 * )
 * // [{id: 1, name: 'John'}, {id: 2}]
 * ```
 */
export function merge<T>(
  root: readonly T[],
  others: readonly T[],
  matcher: (item: T) => any,
): T[] {
  if (!others && !root) {
    return []
  }
  if (!others) {
    return [...root]
  }
  if (!root) {
    return []
  }
  if (!matcher) {
    return [...root]
  }
  return root.reduce((acc, r) => {
    const matched = others.find(o => matcher(r) === matcher(o))
    if (matched) {
      acc.push(matched)
    } else {
      acc.push(r)
    }
    return acc
  }, [] as T[])
}
