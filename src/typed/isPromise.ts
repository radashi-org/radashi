import { isFunction } from 'radashi'

/**
 * Returns true if the value is a Promise or has a `then` method.
 *
 * @see https://radashi-org.github.io/reference/typed/isPromise
 * @example
 * ```ts
 * isPromise(Promise.resolve(1)) // => true
 * isPromise({ then() {} }) // => true
 * isPromise(1) // => false
 * ```
 */
export function isPromise<T>(value: T | Promise<T>): value is Promise<T> {
  if (!value) {
    return false
  }
  if (!(value as any).then) {
    return false
  }
  if (!isFunction((value as any).then)) {
    return false
  }
  return true
}
