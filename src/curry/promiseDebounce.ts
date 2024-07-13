declare const setTimeout: (fn: () => void, ms: number) => unknown
declare const clearTimeout: (timer: unknown) => void

export type PromiseDebounceFunction<
  TArgs extends any[] = any,
  TReturn = any,
> = {
  (...args: TArgs): Promise<Awaited<TReturn>>
  /**
   * Cancels the debounced function
   */
  cancel(): void
  /**
   * Checks if there is any invocation debounced
   */
  isPending(): boolean
  /**
   * If the debounced function is pending, it will be invoked
   * immediately and the result will be returned. Otherwise,
   * `undefined` will be returned.
   */
  flush(...args: TArgs): TReturn | undefined
  /**
   * The underlying function
   */
  readonly handler: (...args: TArgs) => TReturn
}

/**
 * Same as `debounce`, but a promise is returned that resolves with
 * the result if that call was the last one.
 *
 * - The `cancel` method cancels the debounced function.
 * - The `flush` method calls the underlying function immediately if
 *   it was debounced, otherwise it does nothing.
 * - The `isPending` method checks if the debounced function is
 *   pending.
 * - The `toImmediate` method returns the underlying function.
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
export function promiseDebounce<TArgs extends any[], TReturn>(
  { delay }: { delay: number },
  handler: (...args: TArgs) => TReturn,
): PromiseDebounceFunction<TArgs, TReturn> {
  let timeout: unknown | undefined
  let resolver: ((value: TReturn | PromiseLike<TReturn>) => void) | undefined

  const debounced = ((...args: TArgs) => {
    return new Promise<TReturn>(resolve => {
      resolver = resolve

      clearTimeout(timeout)
      timeout = setTimeout(() => {
        timeout = undefined
        resolve(handler(...args))
      }, delay)
    })
  }) as PromiseDebounceFunction<TArgs, TReturn> & { handler: typeof handler }

  debounced.cancel = () => {
    clearTimeout(timeout)
    timeout = undefined
    // The promise's resolver won't be called. JavaScript GC will
    // clean up every reference to the promise.
    resolver = undefined
  }

  debounced.flush = (...args) => {
    if (timeout !== undefined) {
      clearTimeout(timeout)
      timeout = undefined
      const oldResolver = resolver
      const result = handler(...args)
      oldResolver?.(result)
      return result
    }
  }

  debounced.isPending = () => timeout !== undefined
  debounced.handler = handler

  return debounced
}
