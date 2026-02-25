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
export async function toResult<TOk, TErr extends Error = Error>(
  promise: PromiseLike<TOk>,
): Promise<Result<TOk, TErr>> {
  try {
    const result = await promise
    return { ok: true, value: result, error: undefined }
  } catch (error) {
    if (isError(error)) {
      return { ok: false, value: undefined, error: error as TErr }
    }
    throw error
  }
}
