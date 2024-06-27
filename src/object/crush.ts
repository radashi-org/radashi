import { get, keys, objectify } from 'radashi'

/**
 * Flattens a deep object to a single dimension, converting the keys
 * to dot notation.
 *
 * ```ts
 * crush({ name: 'ra', children: [{ name: 'hathor' }] })
 * // { name: 'ra', 'children.0.name': 'hathor' }
 * ```
 */
export function crush<TValue extends object>(value: TValue): object {
  if (!value) {
    return {}
  }
  return objectify(
    keys(value),
    k => k,
    k => get(value, k)
  )
}
