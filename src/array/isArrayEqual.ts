/**
 * Checks if two arrays are equal in length and content using
 * `Object.is` comparison.
 *
 * @see https://radashi.js.org/reference/array/isArrayEqual
 * @example
 * ```ts
 * _.isArrayEqual([1, 2, 3], [1, 2, 3]) // => true
 * _.isArrayEqual([1, 2, 3], [1, 2, 4]) // => false
 * _.isArrayEqual([1, 2], [1, 2, 3]) // => false
 * _.isArrayEqual([], []) // => true
 * _.isArrayEqual([NaN], [NaN]) // => true (Object.is handles NaN)
 * _.isArrayEqual([0], [-0]) // => false (Object.is handles +0 and -0)
 * ```
 * @version 12.7.0
 */
export function isArrayEqual<T>(array1: T[], array2: T[]): boolean {
  if (array1 !== array2) {
    if (array1.length !== array2.length) {
      return false
    }
    for (let i = 0; i < array1.length; i++) {
      if (!Object.is(array1[i], array2[i])) {
        return false
      }
    }
  }
  return true
}
