/**
 * This type produces the type array of `TItems` with all the type items
 * in `TItemsToRemove` removed from the start of the array type.
 *
 * ```ts
 * type T = RemoveItemsInFront<[number, number], [number]>
 * // [number]
 *
 * type T = RemoveItemsInFront<[File, number, string], [File, number]>
 * // [string]
 * ```
 * @version 12.1.0
 */
type RemoveItemsInFront<
  TItems extends any[],
  TItemsToRemove extends any[],
> = TItems extends [...TItemsToRemove, ...infer TRest] ? TRest : TItems

/**
 * Create a partial function by providing some (or all) of the
 * arguments the given function needs.
 *
 * @see https://radashi.js.org/reference/curry/partial
 * @example
 * ```ts
 * const add = (a: number, b: number) => a + b
 *
 * const addFive = partial(add, 5)
 *
 * addFive(2) // => 7
 * ```
 */
export function partial<T extends any[], TA extends Partial<T>, R>(
  fn: (...args: T) => R,
  ...args: TA
): (...rest: RemoveItemsInFront<T, TA>) => R {
  return (...rest) => fn(...([...args, ...rest] as T))
}
