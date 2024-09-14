/**
 * Get the last item in an array or a default value.
 *
 * @see https://radashi.js.org/reference/array/last
 * @example
 * ```ts
 * last([1, 2, 3, 4])
 * // 4
 *
 * last([], 0)
 * // 0
 * ```
 * @version 12.1.0
 */
export function last<T>(array: readonly T[]): T | undefined

export function last<T, U>(array: readonly T[], defaultValue: U): T | U

export function last(array: readonly unknown[], defaultValue?: unknown) {
  return array?.length > 0 ? array[array.length - 1] : defaultValue
}
