type Cache<T> = Record<string, { exp: number | null; value: T }>

function memoize<TArgs extends any[], TResult>(
  cache: Cache<TResult>,
  func: (...args: TArgs) => TResult,
  keyFunc: ((...args: TArgs) => string) | null,
  ttl: number | null
) {
  return function callWithMemo(...args: any): TResult {
    const key = keyFunc ? keyFunc(...args) : JSON.stringify({ args })
    const existing = cache[key]
    if (existing !== undefined) {
      if (!existing.exp) return existing.value
      if (existing.exp > new Date().getTime()) {
        return existing.value
      }
    }
    const result = func(...args)
    cache[key] = {
      exp: ttl ? new Date().getTime() + ttl : null,
      value: result
    }
    return result
  }
}

/**
 * Creates a memoized function. The returned function will only
 * execute the source function when no value has previously been
 * computed. If a ttl (milliseconds) is given previously computed
 * values will be checked for expiration before being returned.
 */
export function memo<TArgs extends any[], TResult>(
  func: (...args: TArgs) => TResult,
  options: {
    key?: (...args: TArgs) => string
    ttl?: number
  } = {}
) {
  return memoize({}, func, options.key ?? null, options.ttl ?? null) as (
    ...args: TArgs
  ) => TResult
}
