/**
 * Shifts array items by `n` steps. If `n` is greater than 0, items
 * will shift `n` steps to the right. If `n` is less than 0, items
 * will shift `n` steps to the left.
 *
 * @see https://radashi-org.github.io/reference/array/shift
 * @example
 * ```ts
 * shift([1, 2, 3], 1) // [3, 1, 2]
 * shift([1, 2, 3], -1) // [2, 3, 1]
 * ```
 */
export function shift<T>(arr: T[], n: number): T[] {
  if (arr.length === 0) {
    return arr
  }

  const shiftNumber = n % arr.length

  if (shiftNumber === 0) {
    return arr
  }

  return [...arr.slice(-shiftNumber, arr.length), ...arr.slice(0, -shiftNumber)]
}
