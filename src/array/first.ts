/**
 * Get the first item in an array or a default value
 */
export const first = <T>(
  array: readonly T[],
  defaultValue: T | null | undefined = undefined
) => {
  return array?.length > 0 ? array[0] : defaultValue
}
