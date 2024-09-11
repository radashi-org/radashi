/**
 * Creates an [n-ary Cartesian product](https://en.wikipedia.org/wiki/Cartesian_product#n-ary_Cartesian_product) from the given arrays.
 *
 * @see https://radashi.js.org/reference/array/product
 * @example
 * ```ts
 * product([['red', 'blue'], ['big', 'small'], ['fast', 'slow']])
 * // [
 * //   ['red', 'big', 'fast'],
 * //   ['red', 'big', 'slow'],
 * //   ['red', 'small', 'fast'],
 * //   ['red', 'small', 'slow'],
 * //   ['blue', 'big', 'fast'],
 * //   ['blue', 'big', 'slow'],
 * //   ['blue', 'small', 'fast'],
 * //   ['blue', 'small', 'slow']
 * // ]
 * ```
 */
export function product<T>(arrays: T[][]): T[][] {
  let out: T[][] = [[]]
  for (const array of arrays) {
    const result: T[][] = []
    for (const currentArray of out) {
      for (const item of array) {
        const currentArrayCopy = currentArray.slice()
        currentArrayCopy.push(item)
        result.push(currentArrayCopy)
      }
    }
    out = result
  }
  return out
}
