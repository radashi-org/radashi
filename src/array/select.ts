/**
 * Select performs a filter and a mapper inside of a reduce, only
 * iterating the list one time.
 *
 * @example
 * select([1, 2, 3, 4], x => x*x, x > 2) == [9, 16]
 */
export const select = <T, K>(
  array: readonly T[],
  mapper: (item: T, index: number) => K,
  condition?: (item: T, index: number) => boolean
) => {
  if (!array) return []
  let mapped: K
  return array.reduce((acc, item, index) => {
    if (condition) condition(item, index) && acc.push(mapper(item, index))
    else (mapped = mapper(item, index)) != null && acc.push(mapped)
    return acc
  }, [] as K[])
}
