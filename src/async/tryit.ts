import { isPromise, type Result, type ResultPromise } from 'radashi'

/**
 * The result of a `tryit` function.
 *
 * If the function returns a promise, the result is a promise that
 * resolves to an error-first callback-_like_ array response as
 * `[Error, result]`.
 *
 * If the function returns a non-promise, the result is an error-first
 * callback-_like_ array response as `[Error, result]`.
 *
 * @see https://radashi.js.org/reference/async/tryit
 * @example
 * ```ts
 * const [err, result] = await tryit(async () => {
 *   return await fetch('https://example.com')
 * })
 * ```
 * @version 12.1.0
 */
export type TryitResult<
  TReturn,
  TError extends Error = Error,
> = TReturn extends PromiseLike<infer TResult>
  ? ResultPromise<TResult, TError>
  : Result<TReturn, TError>

/**
 * A helper to try an async function without forking the control flow.
 * Returns an error-first callback-_like_ array response as `[Error,
 * result]`
 */
export function tryit<
  TArgs extends any[],
  TReturn,
  TError extends Error = Error,
>(
  func: (...args: TArgs) => TReturn,
): (...args: TArgs) => TryitResult<TReturn, TError> {
  return (...args): any => {
    try {
      const result = func(...args)
      return isPromise(result)
        ? result.then(
            value => [undefined, value],
            err => [err, undefined],
          )
        : [undefined, result]
    } catch (err) {
      return [err, undefined]
    }
  }
}

export { tryit as try }
