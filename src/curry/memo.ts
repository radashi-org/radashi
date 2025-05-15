import { type NoInfer, isArray, selectFirst, sift } from 'radashi'

type KeyOrKeys = string | (string | undefined)[]
type Cache<T> = Record<string, { exp: number | null; value: T }>

function memoize<TArgs extends any[], TResult>(
  cache: Cache<TResult>,
  func: (...args: TArgs) => TResult,
  getKeyFunc: ((...args: TArgs) => KeyOrKeys) | null,
  setKeyFunc: ((...args: TArgs) => KeyOrKeys) | null,
  ttl: number | null,
) {
  return function callWithMemo(...args: any): TResult {
    const keyOrKeys = getKeyFunc
      ? getKeyFunc(...args)
      : JSON.stringify({ args })
    const keys = isArray(keyOrKeys) ? sift(keyOrKeys) : [keyOrKeys]

    const existing = selectFirst(keys, key => cache[key])
    if (existing !== undefined) {
      if (!existing.exp) {
        return existing.value
      }
      if (existing.exp > new Date().getTime()) {
        return existing.value
      }
    }
    const result = func(...args)

    const setKeyOrKeys = setKeyFunc ? setKeyFunc(...args) : keys
    const setKeys = isArray(setKeyOrKeys) ? sift(setKeyOrKeys) : [setKeyOrKeys]
    for (const key of setKeys) {
      cache[key] = {
        exp: ttl ? new Date().getTime() + ttl : null,
        value: result,
      }
    }
    return result
  }
}

export interface MemoOptions<TArgs extends any[]> {
  key?: (...args: TArgs) => KeyOrKeys
  setKey?: (...args: TArgs) => KeyOrKeys
  ttl?: number
}

/**
 * Creates a memoized function. The returned function will only
 * execute the source function when no value has previously been
 * computed. If a ttl (milliseconds) is given previously computed
 * values will be checked for expiration before being returned.
 *
 * @see https://radashi.js.org/reference/curry/memo
 * @example
 * ```ts
 * const calls: number[] = []
 * const fib = memo((x: number) => {
 *   calls.push(x)
 *   return x < 2 ? x : fib(x - 1) + fib(x - 2)
 * })
 *
 * fib(10) // 55
 * fib(10) // 55
 * // calls === [10]
 *
 * fib(11) // 89
 * // calls === [10, 11]
 * ```
 * @version 12.1.0
 */
export function memo<TArgs extends any[], TResult>(
  func: (...args: TArgs) => TResult,
  options: MemoOptions<NoInfer<TArgs>> = {},
): (...args: TArgs) => TResult {
  return memoize(
    {},
    func,
    options.key ?? null,
    options.setKey ?? null,
    options.ttl ?? null,
  )
}
