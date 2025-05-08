type MayBePromise<T> = T | Promise<T>

// the input is the output of previous function.
type Func<TArg = unknown, TResult = unknown> = (
  arg: TArg,
) => MayBePromise<TResult>

/**
 * Creates a function that executes multiple asynchronous/synchronous functions
 * in same order as they are passed in arguments. Passes previous function
 * result to next fucntion. Returned function returns a Promise with
 * output of last function.
 *
 * @see https://radashi.js.org/reference/async/promiseChain
 * @example
 * ```ts
 * const chained = promiseChain(
 *   (x: number, y: number) => x + y
 *   async (n: number) => n * 2
 *   async (n: number) => `Your Value is ${n}`
 * )
 *
 * await chained(2, 3) // "Your Value is 10"
 * ```
 * @version 12.1.0
 */
export function promiseChain<Arg1 extends any[], Arg2, R>(
  f1: (...args: Arg1) => MayBePromise<Arg2>,
  f2: (arg: Arg2) => MayBePromise<R>,
): (...arg: Arg1) => Promise<R>
export function promiseChain<Arg1 extends any[], Arg2, Arg3, R>(
  f1: (...args: Arg1) => MayBePromise<Arg2>,
  f2: (arg: Arg2) => MayBePromise<Arg3>,
  f3: (arg: Arg3) => MayBePromise<R>,
): (...args: Arg1) => Promise<R>
export function promiseChain<Arg1 extends any[], Arg2, Arg3, Arg4, R>(
  f1: (...args: Arg1) => MayBePromise<Arg2>,
  f2: (args: Arg2) => MayBePromise<Arg3>,
  f3: (args: Arg3) => MayBePromise<Arg4>,
  f4: (args: Arg4) => MayBePromise<R>,
): (...args: Arg1) => Promise<R>
export function promiseChain<Arg1 extends any[], Arg2, Arg3, Arg4, Arg5, R>(
  f1: (...args: Arg1) => MayBePromise<Arg2>,
  f2: (args: Arg2) => MayBePromise<Arg3>,
  f3: (args: Arg3) => MayBePromise<Arg4>,
  f4: (args: Arg4) => MayBePromise<Arg5>,
  f5: (args: Arg5) => MayBePromise<R>,
): (...args: Arg1) => Promise<R>
export function promiseChain<
  Arg1 extends any[],
  Arg2,
  Arg3,
  Arg4,
  Arg5,
  Arg6,
  R,
>(
  f1: (...args: Arg1) => MayBePromise<Arg2>,
  f2: (args: Arg2) => MayBePromise<Arg3>,
  f3: (args: Arg3) => MayBePromise<Arg4>,
  f4: (args: Arg4) => MayBePromise<Arg5>,
  f5: (args: Arg5) => MayBePromise<Arg6>,
  f6: (args: Arg6) => MayBePromise<R>,
): (...args: Arg1) => Promise<R>
export function promiseChain<
  Arg1 extends any[],
  Arg2,
  Arg3,
  Arg4,
  Arg5,
  Arg6,
  Arg7,
  R,
>(
  f1: (...args: Arg1) => MayBePromise<Arg2>,
  f2: (args: Arg2) => MayBePromise<Arg3>,
  f3: (args: Arg3) => MayBePromise<Arg4>,
  f4: (args: Arg4) => MayBePromise<Arg5>,
  f5: (args: Arg5) => MayBePromise<Arg6>,
  f6: (args: Arg6) => MayBePromise<Arg7>,
  f7: (args: Arg7) => MayBePromise<R>,
): (...args: Arg1) => Promise<R>
export function promiseChain<
  Arg1 extends any[],
  Arg2,
  Arg3,
  Arg4,
  Arg5,
  Arg6,
  Arg7,
  Arg8,
  R,
>(
  f1: (...args: Arg1) => MayBePromise<Arg2>,
  f2: (args: Arg2) => MayBePromise<Arg3>,
  f3: (args: Arg3) => MayBePromise<Arg4>,
  f4: (args: Arg4) => MayBePromise<Arg5>,
  f5: (args: Arg5) => MayBePromise<Arg6>,
  f6: (args: Arg6) => MayBePromise<Arg7>,
  f7: (args: Arg7) => MayBePromise<Arg8>,
  f8: (args: Arg8) => MayBePromise<R>,
): (...args: Arg1) => Promise<R>
export function promiseChain<
  Arg1 extends any[],
  Arg2,
  Arg3,
  Arg4,
  Arg5,
  Arg6,
  Arg7,
  Arg8,
  Arg9,
  R,
>(
  f1: (...args: Arg1) => MayBePromise<Arg2>,
  f2: (args: Arg2) => MayBePromise<Arg3>,
  f3: (args: Arg3) => MayBePromise<Arg4>,
  f4: (args: Arg4) => MayBePromise<Arg5>,
  f5: (args: Arg5) => MayBePromise<Arg6>,
  f6: (args: Arg6) => MayBePromise<Arg7>,
  f7: (args: Arg7) => MayBePromise<Arg8>,
  f8: (args: Arg8) => MayBePromise<Arg9>,
  f9: (args: Arg9) => MayBePromise<R>,
): (...args: Arg1) => Promise<R>
export function promiseChain<
  Arg1 extends any[],
  Arg2,
  Arg3,
  Arg4,
  Arg5,
  Arg6,
  Arg7,
  Arg8,
  Arg9,
  Arg10,
  R,
>(
  f1: (...args: Arg1) => MayBePromise<Arg2>,
  f2: (args: Arg2) => MayBePromise<Arg3>,
  f3: (args: Arg3) => MayBePromise<Arg4>,
  f4: (args: Arg4) => MayBePromise<Arg5>,
  f5: (args: Arg5) => MayBePromise<Arg6>,
  f6: (args: Arg6) => MayBePromise<Arg7>,
  f7: (args: Arg7) => MayBePromise<Arg8>,
  f8: (args: Arg8) => MayBePromise<Arg9>,
  f9: (args: Arg9) => MayBePromise<Arg10>,
  f10: (args: Arg10) => MayBePromise<R>,
): (...args: Arg1) => Promise<R>
export function promiseChain(...funcs: Function[]) {
  return async function chained<T>(...args: unknown[]): Promise<T> {
    let result = await funcs[0](...args)

    for (let i = 1; i < funcs.length; i++) {
      result = await funcs[i](result)
    }

    return result
  }
}
