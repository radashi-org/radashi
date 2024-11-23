import { isArray, isPlainObject } from 'radashi'

/**
 * Get a string list of all key names that exist in an object (deep).
 *
 * @see https://radashi.js.org/reference/object/keys
 * @example
 * ```ts
 * keys({ name: 'ra' }) // ['name']
 *
 * keys({ name: 'ra', children: [{ name: 'hathor' }] })
 * // ['name', 'children.0.name']
 * ```
 * @version 12.1.0
 */
export function keys(value: object): string[] {
  if (!value) {
    return []
  }
  const keys: string[] = []
  const keyPath: (string | number)[] = []
  const recurse = (value: any) => {
    if (isPlainObject(value)) {
      for (const [prop, propValue] of Object.entries(value)) {
        keyPath.push(prop)
        recurse(propValue)
        keyPath.pop()
      }
    } else if (isArray(value)) {
      value.forEach((item, index) => {
        keyPath.push(index)
        recurse(item)
        keyPath.pop()
      })
    } else {
      keys.push(keyPath.join('.'))
    }
  }
  recurse(value)
  return keys
}
