/**
 * Split an array into two array based on a true/false condition
 * function
 *
 * ```ts
 * fork([1, 2, 3, 4], (n) => n % 2 === 0)
 * // [[2, 4], [1, 3]]
 * ```
 */
export function fork<T>(
  list: readonly T[],
  condition: (item: T) => boolean
): [T[], T[]] {
  if (!list) return [[], []]
  return list.reduce(
    (acc, item) => {
      const [a, b] = acc
      if (condition(item)) {
        return [[...a, item], b]
      } else {
        return [a, [...b, item]]
      }
    },
    [[], []] as [T[], T[]]
  )
}
