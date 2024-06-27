/**
 * This type produces the type array of TItems with all the type items
 * in TItemsToRemove removed from the start of the array type.
 *
 * @example
 * ```
 * RemoveItemsInFront<[number, number], [number]> = [number]
 * RemoveItemsInFront<[File, number, string], [File, number]> = [string]
 * ```
 */
type RemoveItemsInFront<
  TItems extends any[],
  TItemsToRemove extends any[]
> = TItems extends [...TItemsToRemove, ...infer TRest] ? TRest : TItems

export function partial<T extends any[], TA extends Partial<T>, R>(
  fn: (...args: T) => R,
  ...args: TA
) {
  return (...rest: RemoveItemsInFront<T, TA>) =>
    fn(...([...args, ...rest] as T))
}
