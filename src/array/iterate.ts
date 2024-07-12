/**
 * Like a reduce but does not require an array. Only need a number and
 * will iterate the function as many times as specified.
 *
 * NOTE: This is NOT zero indexed. If you pass count=5 you will get 1,
 * 2, 3, 4, 5 iteration in the callback function.
 *
 * @see https://radashi-org.github.io/reference/array/iterate
 * @example
 * ```ts
 * iterate(3, (total, i) => total + i, 0)
 * // 6
 * ```
 */
export function iterate<T>(
  count: number,
  func: (currentValue: T, iteration: number) => T,
  initValue: T,
): T {
  let value = initValue
  for (let i = 1; i <= count; i++) {
    value = func(value, i)
  }
  return value
}
