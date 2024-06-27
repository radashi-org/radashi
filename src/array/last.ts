/**
 * Get the last item in an array or a default value
 */
export function last<T>(
  array: readonly T[],
  defaultValue: T | null | undefined = undefined
) {
  return array?.length > 0 ? array[array.length - 1] : defaultValue
}
