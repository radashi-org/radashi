/**
 * Given an array of arrays, returns a single dimensional array with
 * all items in it.
 */
export function flat<T>(lists: readonly T[][]): T[] {
  return lists.reduce((acc, list) => {
    acc.push(...list)
    return acc
  }, [])
}
