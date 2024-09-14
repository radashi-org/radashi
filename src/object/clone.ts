import { isPrimitive } from 'radashi'

/**
 * Creates a shallow copy of the given object/value.
 *
 * @see https://radashi.js.org/reference/object/clone
 * @example
 * ```ts
 * const original = { a: 1, b: { c: 3 } }
 * const cloned = clone(original)
 * // => { a: 1, b: { c: 3 } }
 * original !== cloned
 * // => true
 * original.b === cloned.b
 * // => true
 * ```
 * @version 12.1.0
 */
export function clone<T>(obj: T): T {
  // Primitive values do not need cloning.
  if (isPrimitive(obj)) {
    return obj
  }

  // Binding a function to an empty object creates a copy function.
  if (typeof obj === 'function') {
    return obj.bind({})
  }

  const proto = Object.getPrototypeOf(obj)
  const newObj =
    typeof proto?.constructor === 'function'
      ? new proto.constructor()
      : Object.create(proto)

  for (const key of Object.getOwnPropertyNames(obj)) {
    newObj[key] = obj[key as keyof T]
  }

  return newObj
}
