import { isEqual } from 'radashi'

/**
 * Check if two maps are equal. Items are checked for deep equality
 * using the `isEqual` function.
 *
 * @see https://radashi.js.org/reference/typed/isMapEqual
 * @version 12.7.0
 */
export function isMapEqual(x: Map<any, any>, y: Map<any, any>): boolean {
  if (x.size !== y.size) {
    return false
  }
  for (const [key, value] of x) {
    if (!isEqual(value, y.get(key))) {
      return false
    }
  }
  return true
}
