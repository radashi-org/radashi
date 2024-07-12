/**
 * Checks if the given value is primitive.
 *
 * Primitive types include:
 * - number
 * - string
 * - boolean
 * - symbol
 * - bigint
 * - undefined
 * - null
 *
 * @see https://radashi-org.github.io/reference/typed/isPrimitive
 * @example
 * ```ts
 * isPrimitive(0) // => true
 * isPrimitive(null) // => true
 * isPrimitive(undefined) // => true
 * isPrimitive('0') // => false
 * ```
 */
export function isPrimitive(value: any): boolean {
  return (
    value === undefined ||
    value === null ||
    (typeof value !== 'object' && typeof value !== 'function')
  )
}
