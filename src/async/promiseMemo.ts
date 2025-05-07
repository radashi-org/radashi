declare const setTimeout: (fn: () => void, ms: number) => number

type ArgsOf<Func> = Func extends (...args: infer Arg) => any ? Arg : never
type ResultOf<Func> = Func extends (...args: any[]) => infer R ? R : never
type CacheValue<T> = {
  promise: Promise<T>
  timestamp: number
}
type Cache<K, T> = Map<K, CacheValue<T>>
type AsyncFunc<TArgs extends any[] = any[], TResult = any> = (
  ...args: TArgs
) => Promise<TResult>

export interface Options<Func extends AsyncFunc, Key = unknown> {
  key?: ((...args: ArgsOf<Func>) => Key) | null
  ttl?: number | null
}

function memoize<Func extends AsyncFunc, Key>(
  cache: Cache<Key, ResultOf<Func>>,
  func: Func,
  keyFunc: ((...args: ArgsOf<Func>) => Key) | null,
  ttl: number | null,
) {
  return function callWithMemo(...args: any): Promise<ResultOf<Func>> {
    const now = Date.now()

    // Clean expired entries before doing anything,
    // so we don't return stale values.
    if (ttl !== null) {
      for (const [key, value] of cache) {
        if (now - value.timestamp > ttl) {
          cache.delete(key)
        }
      }
    }

    const key = keyFunc ? keyFunc(...args) : (JSON.stringify(args[0]) as Key)
    const cached = cache.get(key)

    if (cached !== undefined) {
      return cached.promise
    }

    const promise = func(...args)

    cache.set(key, { promise, timestamp: Date.now() })

    promise.catch(() => {
      cache.delete(key)
    })

    return promise
  }
}

/**
 * Creates an async memoized function. The returned function will only
 * execute the source function when no value has previously been computed.
 * If a ttl value(milliseconds) is given previously computed values will
 * be checked for expiration before being returned.
 *
 * @see https://radashi.js.org/reference/async/promiseMemo
 * @example
 * ```ts
 * const calls: number[] = []
 * const fetchUser = promiseMemo(
 *   async (id: number) => {
 *     calls.push(id)
 *
 *     // Simpuate network delay
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
 *
 * ```
 * @version@12.1.0
 */
export function promiseMemo<Func extends AsyncFunc, Key = unknown>(
  func: Func,
  options: Options<Func, Key> = {},
): (...args: ArgsOf<Func>) => Promise<ResultOf<Func>> {
  const cache: Cache<Key, ResultOf<Func>> = new Map()
  const ttl: Options<Func, Key>['ttl'] = options.ttl ?? null
  const keyFunc: Options<Func, Key>['key'] = options.key ?? null

  return memoize<Func, Key>(cache, func, keyFunc, ttl)
}
