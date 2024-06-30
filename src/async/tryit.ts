import { isPromise } from 'radashi'

/**
 * The result of a `tryit` function.
 *
 * If the function returns a promise, the result is a promise that
 * resolves to an error-first callback-_like_ array response as
 * `[Error, result]`.
 *
 * If the function returns a non-promise, the result is an error-first
 * callback-_like_ array response as `[Error, result]`.
 */
export type TryitResult<Return> = Return extends Promise<any>
  ? Promise<[Error, undefined] | [undefined, Awaited<Return>]>
  : [Error, undefined] | [undefined, Return]

/**
 * A helper to try an async function without forking the control flow.
 * Returns an error-first callback-_like_ array response as `[Error,
 * result]`
 */
export function tryit<Args extends any[], Return>(
  func: (...args: Args) => Return,
): (...args: Args) => TryitResult<Return> {
  return (...args) => {
    try {
      const result = func(...args)
      if (isPromise(result)) {
        return result
          .then(value => [undefined, value])
          .catch(err => [err, undefined]) as TryitResult<Return>
      }
      return [undefined, result] as TryitResult<Return>
    } catch (err) {
      return [err, undefined] as TryitResult<Return>
    }
  }
}

export { tryit as try }
