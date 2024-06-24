import { set } from './set'

/**
 * The opposite of crush, given an object that was crushed into key
 * paths and values will return the original object reconstructed.
 *
 * @example
 * construct({ name: 'ra', 'children.0.name': 'hathor' })
 * // { name: 'ra', children: [{ name: 'hathor' }] }
 */
export const construct = <TObject extends object>(obj: TObject): object => {
  if (!obj) return {}
  return Object.keys(obj).reduce((acc, path) => {
    return set(acc, path, (obj as any)[path])
  }, {})
}
