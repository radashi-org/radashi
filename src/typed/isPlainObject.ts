// Credit to
// https://github.com/sindresorhus/is-plain-obj/blob/97f38e8836f86a642cce98fc6ab3058bc36df181/index.js

/**
 * Return true if the given value is a plain object.
 *
 * @see https://radashi-org.github.io/reference/typed/isPlainObject
 * @example
 * ```ts
 * isPlainObject({}) // => true
 * isPlainObject(new Map()) // => false
 * ```
 */
export function isPlainObject(value: any): value is object {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  const prototype = Object.getPrototypeOf(value)
  return (
    (prototype === null ||
      prototype === Object.prototype ||
      Object.getPrototypeOf(prototype) === null) &&
    !(Symbol.toStringTag in value) &&
    !(Symbol.iterator in value)
  )
}
