/**
 * Dynamically get a nested value from an array or object with a
 * string.
 *
 * @see https://radashi-org.github.io/reference/object/get
 * @example
 * ```ts
 * const person = {
 *   name: 'John',
 *   friends: [{ name: 'Jane' }]
 * }
 *
 * get(person, 'friends[0].name')
 * // => 'Jane'
 * ```
 */
export function get<TDefault = unknown>(
  value: any,
  path: string,
  defaultValue?: TDefault,
): TDefault {
  const segments = path.split(/[\.\[\]]/g)
  let current: any = value
  for (const key of segments) {
    if (current === null) {
      return defaultValue as TDefault
    }
    if (current === undefined) {
      return defaultValue as TDefault
    }
    const unquotedKey = key.replace(/['"]/g, '')
    if (unquotedKey.trim() === '') {
      continue
    }
    current = current[unquotedKey]
  }
  if (current === undefined) {
    return defaultValue as TDefault
  }
  return current
}
