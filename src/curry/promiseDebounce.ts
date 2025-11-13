import { type DebounceFunction, type DebounceOptions, noop } from 'radashi'

declare const setTimeout: (fn: () => void, ms: number) => unknown
declare const clearTimeout: (timer: unknown) => void

export interface PromiseDebounceFunction<
  TArgs extends any[] = any,
  TReturn = any,
> extends DebounceFunction<TArgs, Promise<TReturn>> {
  /**
   * If a debounced call is scheduled, this invokes it immediately and
   * returns its promise. Otherwise, it returns `undefined`.
   */
  flush(): Promise<TReturn> | undefined
}

export type PromiseDebounced<TCallee extends (...args: any[]) => any> =
  PromiseDebounceFunction<Parameters<TCallee>, Awaited<ReturnType<TCallee>>> & {
    callee: TCallee
  }

/**
 * Same as `debounce`, but a promise is returned that resolves with
 * the result if that call was the last one.
 *
 * See the documentation (or the `PromiseDebounceFunction` type) for
 * details on the methods and properties available on the returned
 * function.
 *
 * @see https://radashi-org.github.io/reference/curry/promiseDebounce
 * @example
 * ```ts
 * const myDebouncedFunc = promiseDebounce({ delay: 1000 }, (x) => x + 1)
 *
 * myDebouncedFunc(0).then(x => console.log(x))
 * myDebouncedFunc(1).then(x => console.log(x))
 * // Logs "2"
 * ```
 */
export function promiseDebounce<TCallee extends (...args: any[]) => any>(
  { delay, leading }: DebounceOptions,
  callee: TCallee,
): PromiseDebounced<TCallee> {
  type TArgs = Parameters<TCallee>
  type TReturn = Awaited<ReturnType<TCallee>>

  let timeout: unknown

  const debounced = ((...args: TArgs) => {
    const promise = new Promise<TReturn>(resolve => {
      if (leading) {
        leading = false
        resolve(callee(...args))
      } else {
        clearTimeout(timeout)
        timeout = setTimeout(
          (debounced.flush = () => {
            debounced.cancel()
            resolve((async () => callee(...args))())
            return promise
          }),
          delay,
        )
      }
    })
    return promise
  }) as PromiseDebounced<TCallee>

  debounced.callee = callee
  debounced.isDebounced = () => timeout !== undefined
  debounced.flush = noop
  debounced.cancel = () => {
    debounced.flush = noop
    clearTimeout(timeout)
    timeout = undefined
  }

  return debounced
}
