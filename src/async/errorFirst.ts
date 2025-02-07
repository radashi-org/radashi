import { isFunction } from 'radashi'

const reject = (error: Error): [Error, null] => [error, null]
const fulfill = <T>(result: T): [null, T] => [null, result]

export type ErrorFirst<TResult> = [null, TResult] | [Error, null]

/**
 * Call an async function and return a promise that resolves to an
 * array of the error and the value.
 *
 * - If the promise resolves, the result is `[null, value]`.
 * - If the promise rejects, the result is `[error, null]`.
 *
 * @example
 * ```ts
 * const [error, data] = await errorFirst(async () => 'data')
 * if (error) {
 *   console.error(error)
 * } else {
 *   console.log(data)
 * }
 * ```
 */
export function errorFirst<T, Args extends any[]>(
  fn: (...args: Args) => Promise<T>,
  ...args: Args
): Promise<ErrorFirst<T>>

export function errorFirst<T>(promise: Promise<T>): Promise<ErrorFirst<T>>

export function errorFirst<T>(
  promise: Promise<T> | ((...args: any[]) => Promise<T>),
  ...args: any[]
): Promise<ErrorFirst<T>> {
  if (isFunction(promise)) {
    try {
      promise = promise(...args)
    } catch (error) {
      promise = Promise.reject(error)
    }
  }
  return promise.then(fulfill, reject)
}
