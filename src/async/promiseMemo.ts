import type { Memoized, MemoOptions } from 'radashi'

/**
 * Creates a memoized function for async operations. This function caches results
 * to avoid redundant executions of expensive async operations. The source function
 * only runs when no cached result exists for the given arguments. When a TTL
 * (time-to-live in milliseconds) is specified, cached results will expire after
 * the designated time period, triggering a fresh execution on subsequent calls.
 *
 * @see https://radashi.js.org/reference/async/promiseMemo
 * @example
 * ```ts
 * const calls: number[] = []
 * const fetchUser = promiseMemo(
 *   async (id: number) => {
 *     calls.push(id)
 *
 *     // Simuate network delay
 *     await new Promise(resolve => setTimeout(resolve, 100))
 *
 *     return {
 *       id,
 *       name: `User-${id}`,
 *     }
 *   },
 *   { ttl: 5000 },
 * )
 *
 *  // First call
 * await fetchUser(1) // { id: 1, name: 'User 1' }
 *
 * // Doesn't trigger API call, returns cached result
 * await fetchUser(1) // { id: 1, name: 'User 1' }
 *
 * // calls array
 * console.log(calls) // [1]
 * ```
 * @version 13.0.0
 */
export function promiseMemo<TFunc extends (...args: any[]) => Promise<any>>(
  func: TFunc,
  options: MemoOptions<TFunc> = {},
): Memoized<TFunc> {
  const { key: keyFunc, ttl, cache = {} } = options

  return function callWithMemo(...args) {
    const key = keyFunc ? keyFunc(...args) : JSON.stringify({ args })
    const existing = cache[key]

    if (existing !== undefined) {
      if (!existing.exp) {
        return existing.value
      }
      if (existing.exp > new Date().getTime()) {
        return existing.value
      }
    }

    const promise = func(...args) as ReturnType<TFunc>

    cache[key] = {
      exp: ttl ? new Date().getTime() + ttl : null,
      value: promise,
    }

    promise.catch(() => {
      delete cache[key]
    })

    return promise
  }
}
