/**
 * Get the first item in an array or a default value
 *
 * ```ts
 * first([1, 2, 3, 4])
 * // 1
 *
 * first([], 0)
 * // 0
 * ```
 */
export function first<T>(
  array: readonly T[],
  defaultValue: T | null | undefined = undefined
) {
  return array?.length > 0 ? array[0] : defaultValue
}
