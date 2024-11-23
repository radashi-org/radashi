// Credit to
// https://github.com/sindresorhus/is-plain-obj/blob/97f38e8836f86a642cce98fc6ab3058bc36df181/index.js

/**
 * Return true if the given value is a plain object.
 *
 * @see https://radashi.js.org/reference/typed/isPlainObject
 * @example
 * ```ts
 * isPlainObject({}) // => true
 * isPlainObject(new Map()) // => false
 * ```
 * @version 12.2.0
 */
export function isPlainObject(value: any): value is object {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  const prototype = Object.getPrototypeOf(value)
  return (
    // Fast path for most common objects.
    prototype === Object.prototype ||
    // Support objects created without a prototype.
    prototype === null ||
    // Support plain objects from other realms.
    Object.getPrototypeOf(prototype) === null
  )
}
