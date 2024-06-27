/**
 * An async map function. Works like the built-in Array.map function
 * but handles an async mapper function
 */
export async function map<T, K>(
  array: readonly T[],
  asyncMapFunc: (item: T, index: number) => Promise<K>,
): Promise<K[]> {
  if (!array) {
    return []
  }
  const result = []
  let index = 0
  for (const value of array) {
    const newValue = await asyncMapFunc(value, index++)
    result.push(newValue)
  }
  return result
}
