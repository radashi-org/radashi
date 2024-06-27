import { objectify } from 'radashi'
import { get } from 'radashi'
import { keys } from 'radashi'

/**
 * Flattens a deep object to a single demension, converting the keys
 * to dot notation.
 *
 * @example
 * crush({ name: 'ra', children: [{ name: 'hathor' }] })
 * // { name: 'ra', 'children.0.name': 'hathor' }
 */
export function crush<TValue extends object>(value: TValue): object {
  if (!value) return {}
  return objectify(
    keys(value),
    k => k,
    k => get(value, k)
  )
}
