/**
 * Check if two sets are equal.
 *
 * Note: This does NOT check for deep equality of the items.
 *
 * @see https://radashi.js.org/reference/typed/isSetEqual
 * @version 12.7.0
 */
export function isSetEqual(x: Set<any>, y: Set<any>): boolean {
  if (x.size !== y.size) {
    return false
  }
  for (const item of x) {
    if (!y.has(item)) {
      return false
    }
  }
  return true
}
