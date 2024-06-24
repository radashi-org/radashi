import { objectify } from '../array/objectify'
import { get } from './get'
import { keys } from './keys'

/**
 * Flattens a deep object to a single demension, converting the keys
 * to dot notation.
 *
 * @example
 * crush({ name: 'ra', children: [{ name: 'hathor' }] })
 * // { name: 'ra', 'children.0.name': 'hathor' }
 */
export const crush = <TValue extends object>(value: TValue): object => {
  if (!value) return {}
  return objectify(
    keys(value),
    k => k,
    k => get(value, k)
  )
}
