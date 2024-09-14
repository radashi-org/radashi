/**
 * Like partial but for unary functions that accept a single object
 * argument
 *
 * @see https://radashi.js.org/reference/curry/partob
 * @example
 * ```ts
 * const add = (
 *   {a = 0, b = 0, c = 0}: {
 *     a?: number,
 *     b?: number,
 *     c?: number
 *   }
 * ) => a + b + c
 *
 * const addPartial = partob(add, { a: 1 })
 * addPartial({ b: 2 }) // 3
 * addPartial({ b: 1, c: 5 }) // 7
 * ```
 * @version 12.1.0
 */
export function partob<T, K, PartialArgs extends Partial<T>>(
  fn: (args: T) => K,
  argObj: PartialArgs,
): (restObj: Omit<T, keyof PartialArgs>) => K {
  return restObj => fn({ ...argObj, ...restObj } as T)
}
