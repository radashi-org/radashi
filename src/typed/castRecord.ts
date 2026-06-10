import { isObject } from 'radashi'

/**
 * Returns `value` as a record if it's an object, or an empty object otherwise.
 *
 * @see https://radashi.js.org/reference/typed/castRecord
 * @example
 * ```ts
 * castRecord({ name: 'Radashi' }) // => { name: 'Radashi' }
 * castRecord(null) // => {}
 * ```
 */
export function castRecord(value: unknown): Record<PropertyKey, unknown> {
  return isObject(value) ? (value as Record<PropertyKey, unknown>) : {}
}
