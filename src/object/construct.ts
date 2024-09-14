import { set } from 'radashi'

/**
 * The opposite of crush, given an object that was crushed into key
 * paths and values will return the original object reconstructed.
 *
 * @see https://radashi.js.org/reference/object/construct
 * @example
 * ```ts
 * construct({ name: 'ra', 'children.0.name': 'hathor' })
 * // { name: 'ra', children: [{ name: 'hathor' }] }
 * ```
 * @version 12.1.0
 */
export function construct<TObject extends object>(obj: TObject): object {
  if (!obj) {
    return {}
  }
  return Object.keys(obj).reduce((acc, path) => {
    return set(acc, path, (obj as any)[path])
  }, {})
}
