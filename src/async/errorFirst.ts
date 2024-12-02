import { isFunction } from 'radashi'

const left = <Error>(error: Error): [Error, null] => [error, null]
const right = <T>(value: T): [null, T] => [null, value]

export type ErrorFirst<T, Error = unknown> = [null, T] | [Error, null]

/**
 * Call an async function and return a promise that resolves to an
 * array of the error and the value.
 *
 * - If the promise resolves, the result is `[null, value]`.
 * - If the promise rejects, the result is `[error, null]`.
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
  return promise.then(right, left)
}
