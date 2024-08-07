/**
 * Get the first item in an array or a default value.
 *
 * @see https://radashi.js.org/reference/array/first
 * @example
 * ```ts
 * first([1, 2, 3, 4])
 * // 1
 *
 * first([], 0)
 * // 0
 * ```
 * @version 12.1.0
 */
export function first<T>(array: readonly [T, ...T[]]): T
export function first<T>(array: readonly T[]): T | undefined

export function first<T, U>(array: readonly [T, ...T[]], defaultValue: U): T
export function first<T, U>(array: readonly T[], defaultValue: U): T | U

export function first(array: readonly unknown[], defaultValue?: unknown) {
  return array?.length > 0 ? array[0] : defaultValue
}
