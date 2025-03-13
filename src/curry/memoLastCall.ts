/**
 * Creates a memoized version of a function that caches only its most
 * recent call.
 *
 * When the function is called with the same arguments as the previous
 * call, it returns the cached result instead of recalculating. This
 * is useful for optimizing expensive calculations when only the
 * latest result needs to be cached, making it more memory-efficient
 * than traditional memoization.
 *
 * @see https://radashi.js.org/reference/curry/memoLastCall
 * @example
 * ```ts
 * const expensiveCalculation = (x: number, y: number): number => {
 *   console.log('Calculating...');
 *   return x + y;
 * };
 *
 * const memoizedCalc = memoLastCall(expensiveCalculation);
 *
 * console.log(memoizedCalc(2, 3));  // Outputs: "Calculating..." then 5
 * console.log(memoizedCalc(2, 3));  // Outputs: 5 (uses cached result)
 * console.log(memoizedCalc(3, 4));  // Outputs: "Calculating..." then 7
 * console.log(memoizedCalc(2, 3));  // Outputs: "Calculating..." then 5 (previous cache was overwritten)
 * ```
 */
export function memoLastCall<Args extends any[], Result>(
  fn: (...args: Args) => Result,
): (...args: Args) => Result {
  let lastArgs: Args | null = null
  let lastResult: Result | null = null

  return (...args: Args): Result => {
    // Check if we have cached args and if they match current args
    if (
      lastArgs &&
      lastArgs.length === args.length &&
      lastArgs.every((arg, i) => Object.is(arg, args[i]))
    ) {
      return lastResult!
    }

    // If no match, calculate new result and cache it
    const result = fn(...args)
    lastArgs = args
    lastResult = result
    return result
  }
}
