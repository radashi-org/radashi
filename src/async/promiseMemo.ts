declare const setTimeout: (fn: () => void, ms: number) => number

type ArgsOf<Func> = Func extends (...args: infer Arg) => any ? Arg : never
type ResultOf<Func> = Func extends (...args: any[]) => infer R ? R : never
type Cache<K, T> = Map<K, { promise: Promise<T>; timestamp: number }>
type AsyncFunc<TArgs extends any[] = any[], TResult = any> = (
  ...args: TArgs
) => Promise<TResult>

export interface Options<Func extends AsyncFunc, Key = unknown> {
  key?: (...args: ArgsOf<Func>) => Key
  ttl?: number
}

function memoize<Func extends AsyncFunc, Key>(
  cache: Cache<Key, ResultOf<Func>>,
  func: Func,
  keyFunc: (...args: ArgsOf<Func>) => Key | null,
  ttl: number | null,
) {
  return function callWithMemo(...args: any): Promise<ResultOf<Func>> {
    const key = args[0]
    const cached = cache.get(key)
    let timeRef: number | null = null

    if (cached !== undefined) {
      return cached.promise
    }

    const vacateExpired = () => {
      if (ttl === null) {
        return
      }

      const now = Date.now()

      for (const [key, value] of cache) {
        if (now - value.timestamp > ttl) {
          cache.delete(key)
        }
      }

      timeRef = null
    }

    const scheduleVacate = () => {
      if (ttl !== null) {
        timeRef = setTimeout(vacateExpired, ttl)
      }
    }

    const promise = func(...args)

    cache.set(key, { promise, timestamp: Date.now() })
    scheduleVacate()

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
export function promiseMemo<Func extends AsyncFunc, Key = unknown>(
  func: Func,
  options: Options<Func> = {},
): (...args: ArgsOf<Func>) => Promise<ResultOf<Func>> {
  const cache = new Map()

  return memoize(cache, func, options.key ?? null, options.ttl ?? null)
}
