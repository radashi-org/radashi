/**
 * Capitalize the first word of the string.
 *
 * @see https://radashi-org.github.io/reference/string/capitalize
 * @example
 * ```ts
 * capitalize('hello') // => 'Hello'
 * capitalize('va va voom') // => 'Va va voom'
 * ```
 */
export function capitalize(str: string): string {
  if (!str || str.length === 0) {
    return ''
  }
  const lower = str.toLowerCase()
  return lower.substring(0, 1).toUpperCase() + lower.substring(1, lower.length)
}
