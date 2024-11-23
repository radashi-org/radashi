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
export function first<
  const TArray extends readonly any[],
  const TDefault = undefined,
>(
  array: TArray,
  defaultValue?: TDefault,
): TArray extends readonly [infer TFirst, ...any[]]
  ? TFirst
  : TArray[number] | TDefault {
  return array?.length > 0 ? array[0] : defaultValue
}
