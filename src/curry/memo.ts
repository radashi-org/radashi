export type MemoCache<T> = Record<string, { exp: number | null; value: T }>

export type Memoized<TFunc extends (...args: any[]) => any> = (
  ...args: Parameters<TFunc>
) => ReturnType<TFunc>

export interface MemoOptions<TFunc extends (...args: any[]) => any> {
  cache?: MemoCache<ReturnType<TFunc>>
  key?: (...args: Parameters<TFunc>) => string
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
export function memo<TFunc extends (...args: any[]) => any>(
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
    const result = func(...args)
    cache[key] = {
      exp: ttl ? new Date().getTime() + ttl : null,
      value: result,
    }
    return result
  } as Memoized<TFunc>
}
