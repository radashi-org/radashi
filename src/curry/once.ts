const onceResult = '__once__'

/**
 * The type of a function wrapped with `once`.
 */
export interface OnceFunction<
  Args extends unknown[] = unknown[],
  Return = unknown,
  This = unknown,
> {
  (this: This, ...args: Args): Return
  [onceResult]?: Return
}

/**
 * Create a function that runs at most once, no matter how many times
 * it's called. If it was already called before, returns the result
 * from the first call. This is a lighter version of `memo()`.
 *
 * To allow the function to be called again, use `onceReset()`.
 *
 * ```ts
 * const fn = once(() => Math.random())
 * fn() // 0.5
 * fn() // 0.5
 * ```
 */
export const once: {
  <Args extends unknown[], Return, This = unknown>(
    fn: (this: This, ...args: Args) => Return,
  ): (this: This, ...args: Args) => Return

  /**
   * Reset the result of a function that was created with `once`,
   * allowing it to be called again.
   *
   * ```ts
   * const fn = once(() => Math.random())
   * fn() // 0.5
   * fn() // 0.5
   * once.reset(fn)
   * fn() // 0.3
   * fn() // 0.3
   * ```
   */
  reset(fn: OnceFunction): void
} = fn => {
  const onceFn = function (...args: any) {
    if (!(onceResult in onceFn)) {
      onceFn[onceResult] = fn.apply(this as any, args)
    }
    return onceFn[onceResult]
  } as OnceFunction
  return onceFn as typeof fn
}

once.reset = (fn: OnceFunction): void => {
  delete fn[onceResult]
}
