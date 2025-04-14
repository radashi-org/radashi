import type { AnyFunction } from './types'

/**
 * @param fn - Any function that need to convert to *unary* function
 * @returns *unary* function (one parameter function)
 * @description `unary` is use to make function, then it can support point-free which 1 parameter
 * `unary(targetFunction)` *is equivalent to* `(x) => targetFunction(x)`
 *
 * @example
 * ```typescript
 * const tripleNums = [111, 222, 333, 444, 555]
 * // ❌ DON'T
 * tripleNums.forEach(console.log)
 * // Print: 111  0  [111, 222, 333, 444]
 * // Print: 222  1  [111, 222, 333, 444]
 * // Print: 333  2  [111, 222, 333, 444]
 * // Print: 444  3  [111, 222, 333, 444]
 *
 * //✅ DO
 * tripleNums.forEach(unary(console.log))
 * // Print: 111
 * // Print: 222
 * // Print: 333
 * // Print: 444
 * ```
 */
export function unary<TFunction extends AnyFunction>(fn: TFunction) {
  return function appliedUnary(
    arg: Parameters<TFunction>[0],
  ): ReturnType<TFunction> {
    return fn(arg)
  }
}
