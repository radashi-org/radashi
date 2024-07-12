/**
 * An async map function. Works like the built-in Array.map function
 * but handles an async mapper function.
 *
 * @see https://radashi-org.github.io/reference/async/map
 * @example
 * ```ts
 * const urls = ['/data1', '/data2', '/data3']
 * const responses = await map(urls, async (url) => {
 *   const response = await fetch('https://api.example.com' + url)
 *   return response.json()
 * })
 * ```
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
