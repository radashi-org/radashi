import { castResult, type CastResult } from 'radashi'

/**
 * A helper to try an async function without forking the control flow.
 * Returns an error-first callback-_like_ array response as `[Error,
 * result]`
 */
export function tryit<TArgs extends any[], TReturn, TError = Error>(
  func: (...args: TArgs) => TReturn,
): (...args: TArgs) => CastResult<TReturn, TError> {
  return (...args) => {
    let result: TReturn
    try {
      result = func(...args)
    } catch (err) {
      return [err, undefined] as CastResult<TReturn, TError>
    }
    return castResult(null, result)
  }
}

export { tryit as try }
