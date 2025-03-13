import { isError } from 'radashi'
import type { Result } from '../types'

/**
 * Converts a `PromiseLike` to a `Promise<Result>`.
 *
 * Note: If the given promise throws a non-Error value, it will be
 * rethrown.
 *
 * @see https://radashi.js.org/reference/async/toResult
 * @example
 * ```ts
 * import { toResult, Result } from 'radashi'
 *
 * const good = async (): Promise<number> => 1
 * const bad = async (): Promise<number> => { throw new Error('bad') }
 *
 * const goodResult = await toResult(good())
 * // => [undefined, 1]
 *
 * const badResult = await toResult(bad())
 * // => [Error('bad'), undefined]
 * ```
 * @version 12.4.0
 */
export async function toResult<T>(promise: PromiseLike<T>): Promise<Result<T>> {
  try {
    const result = await promise
    return [undefined, result]
  } catch (error) {
    if (isError(error)) {
      return [error, undefined]
    }
    throw error
  }
}
