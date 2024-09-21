import { AggregateError, isArray } from 'radashi'

type PromiseValues<T extends Promise<any>[]> = {
  [K in keyof T]: T[K] extends Promise<infer U> ? U : never
}

/**
 * Functionally similar to `Promise.all` or `Promise.allSettled`. If
 * any errors are thrown, all errors are gathered and thrown in an
 * `AggregateError`.
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
export async function all<T extends [Promise<any>, ...Promise<any>[]]>(
  promises: T,
): Promise<PromiseValues<T>>

export async function all<T extends Promise<any>[]>(
  promises: T,
): Promise<PromiseValues<T>>

/**
 * Functionally similar to `Promise.all` or `Promise.allSettled`. If
 * any errors are thrown, all errors are gathered and thrown in an
 * `AggregateError`.
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
export async function all<T extends Record<string, Promise<any>>>(
  promises: T,
): Promise<{ [K in keyof T]: Awaited<T[K]> }>

export async function all(
  promises: Record<string, Promise<any>> | Promise<any>[],
): Promise<any> {
  const entries = isArray(promises)
    ? promises.map(p => [null, p] as const)
    : Object.entries(promises)

  const results = await Promise.all(
    entries.map(([key, value]) =>
      value
        .then(result => ({ result, exc: null, key }))
        .catch(exc => ({ result: null, exc, key })),
    ),
  )

  const exceptions = results.filter(r => r.exc)
  if (exceptions.length > 0) {
    throw new AggregateError(exceptions.map(e => e.exc))
  }

  if (isArray(promises)) {
    return results.map(r => r.result)
  }

  return results.reduce(
    (acc, item) => {
      acc[item.key!] = item.result
      return acc
    },
    {} as Record<string, any>,
  )
}
