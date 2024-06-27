/**
 * Given two lists of the same type, iterate the first list and
 * replace items matched by the matcher func in the first place.
 */
export function merge<T>(
  root: readonly T[],
  others: readonly T[],
  matcher: (item: T) => any
) {
  if (!others && !root) return []
  if (!others) return root
  if (!root) return []
  if (!matcher) return root
  return root.reduce((acc, r) => {
    const matched = others.find(o => matcher(r) === matcher(o))
    if (matched) acc.push(matched)
    else acc.push(r)
    return acc
  }, [] as T[])
}
