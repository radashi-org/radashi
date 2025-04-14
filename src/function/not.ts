import type { PredicateFn } from './types'

/**
 * @description `not` is a function which input any function return boolean and negated its output
 * @example
* ```typescript
* function isOdd (x: number) {
*   // the possible value of `x % 2` is `0` or `1`
*   return x % 2 === 1
* }
*
* const isEven = not(isOdd)
*
* isOdd(3) // => true
* isOdd(4) // => false
*
* isEven(3) // => false
* isEven(4) // => true
*
* not(isOdd)(3)) // => false -> equivalent to `isEven(3)`
* not(isOdd)(4)) // => true -> equivalent to `isEven(4)`
* ```
*/
export function not<TPredicateFn extends PredicateFn>(
  predicateFn: TPredicateFn,
) {
  return function appliedNot(...args: Parameters<TPredicateFn>): boolean {
    return !predicateFn(...args)
  }
}
