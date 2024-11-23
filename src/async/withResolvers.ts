export interface PromiseWithResolvers<T> {
  promise: Promise<T>
  resolve: (value: T | PromiseLike<T>) => void
  reject: (reason?: any) => void
}

/**
 * Creates a new promise and returns the resolve and reject functions along with the promise itself.
 *
 * The ponyfill for https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/withResolvers
 *
 * @see https://radashi.js.org/reference/async/withResolvers
 * @example
 * ```ts
 * const {resolve, reject, promise} = withResolvers()
 *
 * resolve(42)
 * ```
 * @version 12.2.0
 */
export function withResolvers<T>(): PromiseWithResolvers<T> {
  let resolve: any
  let reject: any

  const promise = new Promise<T>((res, rej) => {
    resolve = res
    reject = rej
  })

  return { resolve, reject, promise }
}
