/**
 * Split an array into two array based on a true/false condition
 * function.
 *
 * @see https://radashi-org.github.io/reference/array/fork
 * @example
 * ```ts
 * fork([1, 2, 3, 4], (n) => n % 2 === 0)
 * // [[2, 4], [1, 3]]
 * ```
 */
export function fork<T>(
  array: readonly T[],
  condition: (item: T) => boolean,
): [T[], T[]] {
  const forked: [T[], T[]] = [[], []]
  if (array) {
    for (const item of array) {
      forked[condition(item) ? 0 : 1].push(item)
    }
  }
  return forked
}
