import type { Result } from '../types'

/**
 * Converts a PromiseLike to a Promise<Result>.
 *
 * @example
 * ```ts
 * import { toResult, Ok } from '@radashi/radashi'
 *
 * const good = async (): Promise<number> => 1
 * const bad = async (): Promise<number> => { throw new Error('bad') }
 *
 * const res = await toResult(good())
 * //    ^? Promise<Ok<number> | Err<Error>>
 *
 * if (res[0] === undefined) {
 *   console.log(res[1])
 * }
 * ```
 */
export async function toResult<T>(promise: PromiseLike<T>): Promise<Result<T>> {
  try {
    const result = await promise
    return [undefined, result]
  } catch (err) {
    return [err instanceof Error ? err : new Error(String(err)), undefined]
  }
}
