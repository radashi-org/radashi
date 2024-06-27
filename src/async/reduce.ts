/**
 * An async reduce function. Works like the built-in Array.reduce
 * function but handles an async reducer function
 */
export async function reduce<T, K>(
  array: readonly T[],
  asyncReducer: (acc: K, item: T, index: number) => Promise<K>,
  initValue?: K
): Promise<K> {
  const initProvided = initValue !== undefined
  if (!initProvided && array?.length < 1) {
    throw new Error('Cannot reduce empty array with no init value')
  }
  const iter = initProvided ? array : array.slice(1)
  let value: any = initProvided ? initValue : array[0]
  for (const [i, item] of iter.entries()) {
    value = await asyncReducer(value, item, i)
  }
  return value
}
