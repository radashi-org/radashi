/**
 * Create a function that chains multiple functions together. The
 * functions are called in order. Each function takes the result of
 * the previous function as its first argument.
 *
 * @see https://radashi.js.org/reference/curry/chain
 * @example
 * ```ts
 * const myChainedFunc = chain(
 *   (x) => x + 5,
 *   (x) => x * 2,
 * )
 *
 * myChainedFunc(0)
 * // => 10
 * ```
 * @version 12.1.0
 */
export function chain<T1 extends any[], T2, T3>(
  f1: (...arg: T1) => T2,
  f2: (arg: T2) => T3,
): (...arg: T1) => T3
export function chain<T1 extends any[], T2, T3, T4>(
  f1: (...arg: T1) => T2,
  f2: (arg: T2) => T3,
  f3: (arg: T3) => T4,
): (...arg: T1) => T4
export function chain<T1 extends any[], T2, T3, T4, T5>(
  f1: (...arg: T1) => T2,
  f2: (arg: T2) => T3,
  f3: (arg: T3) => T4,
  f4: (arg: T3) => T5,
): (...arg: T1) => T5
export function chain<T1 extends any[], T2, T3, T4, T5, T6>(
  f1: (...arg: T1) => T2,
  f2: (arg: T2) => T3,
  f3: (arg: T3) => T4,
  f4: (arg: T3) => T5,
  f5: (arg: T3) => T6,
): (...arg: T1) => T6
export function chain<T1 extends any[], T2, T3, T4, T5, T6, T7>(
  f1: (...arg: T1) => T2,
  f2: (arg: T2) => T3,
  f3: (arg: T3) => T4,
  f4: (arg: T3) => T5,
  f5: (arg: T3) => T6,
  f6: (arg: T3) => T7,
): (...arg: T1) => T7
export function chain<T1 extends any[], T2, T3, T4, T5, T6, T7, T8>(
  f1: (...arg: T1) => T2,
  f2: (arg: T2) => T3,
  f3: (arg: T3) => T4,
  f4: (arg: T3) => T5,
  f5: (arg: T3) => T6,
  f6: (arg: T3) => T7,
  f7: (arg: T3) => T8,
): (...arg: T1) => T8
export function chain<T1 extends any[], T2, T3, T4, T5, T6, T7, T8, T9>(
  f1: (...arg: T1) => T2,
  f2: (arg: T2) => T3,
  f3: (arg: T3) => T4,
  f4: (arg: T3) => T5,
  f5: (arg: T3) => T6,
  f6: (arg: T3) => T7,
  f7: (arg: T3) => T8,
  f8: (arg: T3) => T9,
): (...arg: T1) => T9
export function chain<T1 extends any[], T2, T3, T4, T5, T6, T7, T8, T9, T10>(
  f1: (...arg: T1) => T2,
  f2: (arg: T2) => T3,
  f3: (arg: T3) => T4,
  f4: (arg: T3) => T5,
  f5: (arg: T3) => T6,
  f6: (arg: T3) => T7,
  f7: (arg: T3) => T8,
  f8: (arg: T3) => T9,
  f9: (arg: T3) => T10,
): (...arg: T1) => T10
export function chain<
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
  f1: (...arg: T1) => T2,
  f2: (arg: T2) => T3,
  f3: (arg: T3) => T4,
  f4: (arg: T3) => T5,
  f5: (arg: T3) => T6,
  f6: (arg: T3) => T7,
  f7: (arg: T3) => T8,
  f8: (arg: T3) => T9,
  f9: (arg: T3) => T10,
  f10: (arg: T3) => T11,
): (...arg: T1) => T11
export function chain(...funcs: ((...args: any[]) => any)[]) {
  return (...args: any[]) => {
    return funcs.slice(1).reduce((acc, fn) => fn(acc), funcs[0](...args))
  }
}
