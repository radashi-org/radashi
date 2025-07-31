import { isFunction } from 'radashi'

/**
 * Returns true if the value is a Promise or has a `then` method.
 *
 * @see https://radashi.js.org/reference/typed/isPromiseLike
 * @example
 * ```ts
 * isPromiseLike(Promise.resolve(1)) // => true
 * isPromiseLike({ then() {} }) // => true
 * isPromiseLike(1) // => false
 * ```
 * @version 12.1.0
 */
export function isPromiseLike(value: any): value is PromiseLike<unknown> {
  return !!value && isFunction(value.then)
}
