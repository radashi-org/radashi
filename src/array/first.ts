/**
 * Get the first item in an array or a default value.
 *
 * @see https://radashi-org.github.io/reference/array/first
 * @example
 * ```ts
 * first([1, 2, 3, 4])
 * // 1
 *
 * first([], 0)
 * // 0
 * ```
 */
export function first<T>(array: readonly T[]): T | undefined

export function first<T, U>(array: readonly T[], defaultValue: U): T | U

export function first(array: readonly unknown[], defaultValue?: unknown) {
  return array?.length > 0 ? array[0] : defaultValue
}
