import { isArray, isPlainObject } from 'radashi'

/**
 * Get a string list of all key names that exist in an object (deep).
 *
 * @example
 * keys({ name: 'ra' }) // ['name']
 * keys({ name: 'ra', children: [{ name: 'hathor' }] }) // ['name', 'children.0.name']
 */
export const keys = <TValue extends object>(value: TValue): string[] => {
  if (!value) return []
  const keys: string[] = []
  const keyPath: (string | number)[] = []
  const recurse = (value: any) => {
    if (isPlainObject(value)) {
      for (const [k, v] of Object.entries(value)) {
        keyPath.push(k)
        recurse(v)
        keyPath.pop()
      }
    } else if (isArray(value)) {
      value.forEach((v, i) => {
        keyPath.push(i)
        recurse(v)
        keyPath.pop()
      })
    }
    keys.push(keyPath.join('.'))
  }
  recurse(value)
  return keys
}
