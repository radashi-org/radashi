import { toResult, type ToResult } from 'radashi'

/**
 * A helper to try an async function without forking the control flow.
 * Returns an error-first callback-_like_ array response as `[Error,
 * result]`
 */
export function tryit<TArgs extends any[], TReturn, TError = Error>(
  func: (...args: TArgs) => TReturn,
): (...args: TArgs) => ToResult<TReturn, TError> {
  return (...args) => {
    let result: TReturn
    try {
      result = func(...args)
    } catch (err) {
      return [err, undefined] as ToResult<TReturn, TError>
    }
    return toResult(null, result)
  }
}

export { tryit as try }
