import { isFunction } from 'radashi'

/**
 * Returns true if the value is a Promise or has a `then` method.
 *
 * @see https://radashi.js.org/reference/typed/isPromise
 * @example
 * ```ts
 * isPromise(Promise.resolve(1)) // => true
 * isPromise({ then() {} }) // => true
 * isPromise(1) // => false
 * ```
 * @version 12.1.0
 */
export function isPromise(value: any): value is PromiseLike<unknown> {
  return !!value && isFunction(value.then)
}
