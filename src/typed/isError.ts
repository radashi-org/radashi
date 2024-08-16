import { isTagged } from 'radashi'

/**
 * Return true if the given value is an Error object.
 *
 * Instances from [other realms][1] are also supported.
 *
 * [1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof#instanceof_and_multiple_realms
 *
 * @see https://radashi-org.github.io/reference/typed/isError
 * @example
 * ```ts
 * isError(new Error()) // => true
 * isError('hello') // => false
 * ```
 */
export function isError(value: unknown): value is Error {
  return isTagged(value, '[object Error]')
}
