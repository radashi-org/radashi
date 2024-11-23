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
export function last<
  const TArray extends readonly any[],
  const TDefault = undefined,
>(
  array: TArray,
  defaultValue?: TDefault,
): TArray extends readonly [...any[], infer TLast]
  ? TLast
  : TArray[number] | TDefault {
  return array?.length > 0 ? array[array.length - 1] : defaultValue
}
