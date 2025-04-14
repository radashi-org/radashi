import type { AnyFunction } from './types'

/**
 * @param fn - Any function that need to convert to *unary* function
 * @returns *unary* function (one parameter function)
 * @description `unary` is use to make function, then it can support point-free which 1 parameter
 * `unary(targetFunction)` *is equivalent to* `(x) => targetFunction(x)`
 *
 * @example
 * **Example 1: Fixing the common parseInt issue with map**
 * ```typescript
 * ['1', '2', '3'].map(parseInt)
 * // Returns [1, NaN, NaN] because parseInt receives (value, index, array)
 *
 * ['1', '2', '3'].map(unary(parseInt))
 * // Returns [1, 2, 3] as expected
 * ```
 *
 * **Example 2: Working with JSON parsing in data pipelines:**
 * ```typescript
 * const jsonStrings = ['{"name":"Alice"}', '{"name":"Bob"}']
 *
 * // Without unary, we'd need an arrow function
 * const objects1 = jsonStrings.map(str => JSON.parse(str))
 *
 * // With unary, it's cleaner in point-free style
 * const objects2 = jsonStrings.map(unary(JSON.parse))
 *
 */
export function unary<TFunction extends AnyFunction>(fn: TFunction) {
  return function appliedUnary(
    arg: Parameters<TFunction>[0],
  ): ReturnType<TFunction> {
    return fn(arg)
  }
}
