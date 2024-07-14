/**
 * Like partial but for unary functions that accept a single object
 * argument
 *
 * @see https://radashi-org.github.io/reference/curry/partob
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
 */
export function partob<T, K, PartialArgs extends Partial<T>>(
  fn: (args: T) => K,
  argobj: PartialArgs,
): (restobj: Omit<T, keyof PartialArgs>) => K {
  return restobj => fn({ ...argobj, ...restobj } as T)
}
