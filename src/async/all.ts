import { AggregateError, isArray } from 'radashi'

/**
 * Wait for all promises to resolve. Errors from rejected promises are
 * collected into an `AggregateError`.
 *
 * @see https://radashi.js.org/reference/async/all
 * @example
 * ```ts
 * const [user] = await all([
 *   api.users.create(...),
 *   s3.buckets.create(...),
 *   slack.customerSuccessChannel.sendMessage(...)
 * ])
 * ```
 * @version 12.1.0
 */
export async function all<T extends readonly [unknown, ...unknown[]]>(
  input: T,
): Promise<{ -readonly [I in keyof T]: Awaited<T[I]> }>

export async function all<T extends readonly unknown[]>(
  input: T,
): Promise<{ -readonly [I in keyof T]: Awaited<T[I]> }>

/**
 * Check each property in the given object for a promise value. Wait
 * for all promises to resolve. Errors from rejected promises are
 * collected into an `AggregateError`.
 *
 * The returned promise will resolve with an object whose keys are
 * identical to the keys of the input object. The values are the
 * resolved values of the promises.
 *
 * @see https://radashi.js.org/reference/async/all
 * @example
 * ```ts
 * const { user } = await all({
 *   user: api.users.create(...),
 *   bucket: s3.buckets.create(...),
 *   message: slack.customerSuccessChannel.sendMessage(...)
 * })
 * ```
 */
export async function all<T extends Record<string, unknown>>(
  input: T,
): Promise<{ -readonly [K in keyof T]: Awaited<T[K]> }>

export async function all(
  input: Record<string, unknown> | readonly unknown[],
): Promise<any> {
  const errors: any[] = []
  const onError = (err: any) => {
    errors.push(err)
  }

  let output: any
  if (isArray(input)) {
    output = await Promise.all(
      input.map(value => Promise.resolve(value).catch(onError)),
    )
  } else {
    output = { ...input }
    await Promise.all(
      Object.keys(output).map(async key => {
        output[key] = await Promise.resolve(output[key]).catch(onError)
      }),
    )
  }

  if (errors.length > 0) {
    throw new AggregateError(errors)
  }

  return output
}
