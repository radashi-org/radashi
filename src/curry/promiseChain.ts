import type { Awaitable } from 'radashi'

/**
 * Creates a function that executes multiple functions in the same
 * order as they are passed in arguments. Each function may be
 * synchronous or asynchronous. The result of each function is passed
 * to the next function. The final result is returned as a `Promise`.
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
 * @version 12.6.0
 */
export function promiseChain<T1 extends any[], T2, T3>(
  f1: (...args: T1) => Awaitable<T2>,
  f2: (arg: T2) => Awaitable<T3>,
): (...arg: T1) => Promise<T3>
export function promiseChain<T1 extends any[], T2, T3, T4>(
  f1: (...args: T1) => Awaitable<T2>,
  f2: (arg: T2) => Awaitable<T3>,
  f3: (arg: T3) => Awaitable<T4>,
): (...args: T1) => Promise<T4>
export function promiseChain<T1 extends any[], T2, T3, T4, T5>(
  f1: (...args: T1) => Awaitable<T2>,
  f2: (args: T2) => Awaitable<T3>,
  f3: (args: T3) => Awaitable<T4>,
  f4: (args: T4) => Awaitable<T5>,
): (...args: T1) => Promise<T5>
export function promiseChain<T1 extends any[], T2, T3, T4, T5, T6>(
  f1: (...args: T1) => Awaitable<T2>,
  f2: (args: T2) => Awaitable<T3>,
  f3: (args: T3) => Awaitable<T4>,
  f4: (args: T4) => Awaitable<T5>,
  f5: (args: T5) => Awaitable<T6>,
): (...args: T1) => Promise<T6>
export function promiseChain<T1 extends any[], T2, T3, T4, T5, T6, T7>(
  f1: (...args: T1) => Awaitable<T2>,
  f2: (args: T2) => Awaitable<T3>,
  f3: (args: T3) => Awaitable<T4>,
  f4: (args: T4) => Awaitable<T5>,
  f5: (args: T5) => Awaitable<T6>,
  f6: (args: T6) => Awaitable<T7>,
): (...args: T1) => Promise<T7>
export function promiseChain<T1 extends any[], T2, T3, T4, T5, T6, T7, T8>(
  f1: (...args: T1) => Awaitable<T2>,
  f2: (args: T2) => Awaitable<T3>,
  f3: (args: T3) => Awaitable<T4>,
  f4: (args: T4) => Awaitable<T5>,
  f5: (args: T5) => Awaitable<T6>,
  f6: (args: T6) => Awaitable<T7>,
  f7: (args: T7) => Awaitable<T8>,
): (...args: T1) => Promise<T8>
export function promiseChain<T1 extends any[], T2, T3, T4, T5, T6, T7, T8, T9>(
  f1: (...args: T1) => Awaitable<T2>,
  f2: (args: T2) => Awaitable<T3>,
  f3: (args: T3) => Awaitable<T4>,
  f4: (args: T4) => Awaitable<T5>,
  f5: (args: T5) => Awaitable<T6>,
  f6: (args: T6) => Awaitable<T7>,
  f7: (args: T7) => Awaitable<T8>,
  f8: (args: T8) => Awaitable<T9>,
): (...args: T1) => Promise<T9>
export function promiseChain<
  T1 extends any[],
  T2,
  T3,
  T4,
  T5,
  T6,
  T7,
  T8,
  T9,
  T10,
>(
  f1: (...args: T1) => Awaitable<T2>,
  f2: (args: T2) => Awaitable<T3>,
  f3: (args: T3) => Awaitable<T4>,
  f4: (args: T4) => Awaitable<T5>,
  f5: (args: T5) => Awaitable<T6>,
  f6: (args: T6) => Awaitable<T7>,
  f7: (args: T7) => Awaitable<T8>,
  f8: (args: T8) => Awaitable<T9>,
  f9: (args: T9) => Awaitable<T10>,
): (...args: T1) => Promise<T10>
export function promiseChain<
  T1 extends any[],
  T2,
  T3,
  T4,
  T5,
  T6,
  T7,
  T8,
  T9,
  T10,
  T11,
>(
  f1: (...args: T1) => Awaitable<T2>,
  f2: (args: T2) => Awaitable<T3>,
  f3: (args: T3) => Awaitable<T4>,
  f4: (args: T4) => Awaitable<T5>,
  f5: (args: T5) => Awaitable<T6>,
  f6: (args: T6) => Awaitable<T7>,
  f7: (args: T7) => Awaitable<T8>,
  f8: (args: T8) => Awaitable<T9>,
  f9: (args: T9) => Awaitable<T10>,
  f10: (args: T10) => Awaitable<T11>,
): (...args: T1) => Promise<T11>
export function promiseChain(...funcs: ((...args: any[]) => any)[]) {
  return async (...args: any[]) => {
    let result = await funcs[0](...args)

    for (let i = 1; i < funcs.length; i++) {
      result = await funcs[i](result)
    }

    return result
  }
}
