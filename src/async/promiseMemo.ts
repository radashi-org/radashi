type Cache<T> = Map<unknown, { promise: Promise<T>; timestamp: number }>

function memoize<TArgs extends any[], TResult>(
  cache: Cache<TResult>,
  func: (...args: TArgs) => Promise<TResult>,
) {
  return function callWithMemo(...args: any): Promise<TResult> {
    const key = args[0]
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
 * Does a thing.
 *
 * @see https://radashi.js.org/reference/async/promiseMemo
 * @example
 * ```ts
 * promiseMemo()
 * ```
 * @version@12.1.0
 */
export function promiseMemo<TArgs extends any[], TResult>(
  func: (...args: TArgs) => TResult,
): (...args: TArgs) => TResult {
  const cache = new Map()

  return memoize(cache, func)
}
