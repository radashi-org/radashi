/**
 * An async reduce function. Works like the built-in Array.reduce
 * function but handles an async reducer function.
 *
 * @see https://radashi.js.org/reference/async/reduce
 * @example
 * ```ts
 * const result = await reduce([1, 2, 3], async (acc, item, index) => {
 *   return acc + (await computeOnGPU(item))
 * }, 0)
 * ```
 * @version 12.1.0
 */
export async function reduce<T, K>(
  array: readonly T[],
  reducer: (acc: K, item: T, index: number) => Promise<K>,
  initialValue: K,
): Promise<K>
export async function reduce<T, K>(
  array: readonly T[],
  reducer: (acc: K, item: T, index: number) => Promise<K>,
): Promise<K>
export async function reduce<T, K>(
  array: readonly T[],
  reducer: (acc: K, item: T, index: number) => Promise<K>,
  initialValue?: K,
): Promise<K> {
  if (!array) {
    array = []
  }
  const indices = array.keys()
  let acc = initialValue
  // biome-ignore lint/style/noArguments:
  if (acc === undefined && arguments.length < 3) {
    if (!array.length) {
      throw new TypeError('Reduce of empty array with no initial value')
    }
    acc = array[indices.next().value] as any
  }
  for (const index of indices) {
    acc = await reducer(acc!, array[index], index)
  }
  return acc!
}
