/**
 * Create a function that composes multiple functions together. In a
 * composition of functions, each function is given the next function
 * as an argument and must call it to continue executing.
 *
 * @see https://radashi.js.org/reference/curry/compose
 * @example
 * ```ts
 * const myComposedFunc = compose(
 *   (x) => x + 5,
 *   (x) => x * 2,
 * )
 *
 * myComposedFunc(0)
 * // => 5
 * ```
 * @version 12.1.0
 */
export function compose<
  F1Result,
  F1Args extends any[],
  F1NextArgs extends any[],
  LastResult,
>(
  f1: (
    next: (...args: F1NextArgs) => LastResult,
  ) => (...args: F1Args) => F1Result,
  last: (...args: F1NextArgs) => LastResult,
): (...args: F1Args) => F1Result

export function compose<
  F1Result,
  F1Args extends any[],
  F1NextArgs extends any[],
  F2Result,
  F2NextArgs extends any[],
  LastResult,
>(
  f1: (
    next: (...args: F1NextArgs) => F2Result,
  ) => (...args: F1Args) => F1Result,
  f2: (
    next: (...args: F2NextArgs) => LastResult,
  ) => (...args: F1NextArgs) => F2Result,
  last: (...args: F2NextArgs) => LastResult,
): (...args: F1Args) => F1Result

export function compose<
  F1Result,
  F1Args extends any[],
  F1NextArgs extends any[],
  F2NextArgs extends any[],
  F2Result,
  F3NextArgs extends any[],
  F3Result,
  LastResult,
>(
  f1: (
    next: (...args: F1NextArgs) => F2Result,
  ) => (...args: F1Args) => F1Result,
  f2: (
    next: (...args: F2NextArgs) => F3Result,
  ) => (...args: F1NextArgs) => F2Result,
  f3: (
    next: (...args: F3NextArgs) => LastResult,
  ) => (...args: F2NextArgs) => F3Result,
  last: (...args: F3NextArgs) => LastResult,
): (...args: F1Args) => F1Result

export function compose<
  F1Result,
  F1Args extends any[],
  F1NextArgs extends any[],
  F2NextArgs extends any[],
  F2Result,
  F3NextArgs extends any[],
  F3Result,
  F4NextArgs extends any[],
  F4Result,
  LastResult,
>(
  f1: (
    next: (...args: F1NextArgs) => F2Result,
  ) => (...args: F1Args) => F1Result,
  f2: (
    next: (...args: F2NextArgs) => F3Result,
  ) => (...args: F1NextArgs) => F2Result,
  f3: (
    next: (...args: F3NextArgs) => F4Result,
  ) => (...args: F2NextArgs) => F3Result,
  f4: (
    next: (...args: F4NextArgs) => LastResult,
  ) => (...args: F3NextArgs) => F4Result,
  last: (...args: F4NextArgs) => LastResult,
): (...args: F1Args) => F1Result

export function compose<
  F1Result,
  F1Args extends any[],
  F1NextArgs extends any[],
  F2NextArgs extends any[],
  F2Result,
  F3NextArgs extends any[],
  F3Result,
  F4NextArgs extends any[],
  F4Result,
  F5NextArgs extends any[],
  F5Result,
  LastResult,
>(
  f1: (
    next: (...args: F1NextArgs) => F2Result,
  ) => (...args: F1Args) => F1Result,
  f2: (
    next: (...args: F2NextArgs) => F3Result,
  ) => (...args: F1NextArgs) => F2Result,
  f3: (
    next: (...args: F3NextArgs) => F4Result,
  ) => (...args: F2NextArgs) => F3Result,
  f4: (
    next: (...args: F4NextArgs) => F5Result,
  ) => (...args: F3NextArgs) => F4Result,
  f5: (
    next: (...args: F5NextArgs) => LastResult,
  ) => (...args: F4NextArgs) => F5Result,
  last: (...args: F5NextArgs) => LastResult,
): (...args: F1Args) => F1Result

export function compose<
  F1Result,
  F1Args extends any[],
  F1NextArgs extends any[],
  F2NextArgs extends any[],
  F2Result,
  F3NextArgs extends any[],
  F3Result,
  F4NextArgs extends any[],
  F4Result,
  F5NextArgs extends any[],
  F5Result,
  F6NextArgs extends any[],
  F6Result,
  LastResult,
>(
  f1: (
    next: (...args: F1NextArgs) => F2Result,
  ) => (...args: F1Args) => F1Result,
  f2: (
    next: (...args: F2NextArgs) => F3Result,
  ) => (...args: F1NextArgs) => F2Result,
  f3: (
    next: (...args: F3NextArgs) => F4Result,
  ) => (...args: F2NextArgs) => F3Result,
  f4: (
    next: (...args: F4NextArgs) => F5Result,
  ) => (...args: F3NextArgs) => F4Result,
  f5: (
    next: (...args: F5NextArgs) => F6Result,
  ) => (...args: F4NextArgs) => F5Result,
  f6: (
    next: (...args: F6NextArgs) => LastResult,
  ) => (...args: F5NextArgs) => F6Result,
  last: (...args: F6NextArgs) => LastResult,
): (...args: F1Args) => F1Result

export function compose<
  F1Result,
  F1Args extends any[],
  F1NextArgs extends any[],
  F2NextArgs extends any[],
  F2Result,
  F3NextArgs extends any[],
  F3Result,
  F4NextArgs extends any[],
  F4Result,
  F5NextArgs extends any[],
  F5Result,
  F6NextArgs extends any[],
  F6Result,
  F7NextArgs extends any[],
  F7Result,
  LastResult,
>(
  f1: (
    next: (...args: F1NextArgs) => F2Result,
  ) => (...args: F1Args) => F1Result,
  f2: (
    next: (...args: F2NextArgs) => F3Result,
  ) => (...args: F1NextArgs) => F2Result,
  f3: (
    next: (...args: F3NextArgs) => F4Result,
  ) => (...args: F2NextArgs) => F3Result,
  f4: (
    next: (...args: F4NextArgs) => F5Result,
  ) => (...args: F3NextArgs) => F4Result,
  f5: (
    next: (...args: F5NextArgs) => F6Result,
  ) => (...args: F4NextArgs) => F5Result,
  f6: (
    next: (...args: F6NextArgs) => F7Result,
  ) => (...args: F5NextArgs) => F6Result,
  f7: (
    next: (...args: F7NextArgs) => LastResult,
  ) => (...args: F6NextArgs) => F7Result,
  last: (...args: F7NextArgs) => LastResult,
): (...args: F1Args) => F1Result

export function compose<
  F1Result,
  F1Args extends any[],
  F1NextArgs extends any[],
  F2NextArgs extends any[],
  F2Result,
  F3NextArgs extends any[],
  F3Result,
  F4NextArgs extends any[],
  F4Result,
  F5NextArgs extends any[],
  F5Result,
  F6NextArgs extends any[],
  F6Result,
  F7NextArgs extends any[],
  F7Result,
  F8NextArgs extends any[],
  F8Result,
  LastResult,
>(
  f1: (
    next: (...args: F1NextArgs) => F2Result,
  ) => (...args: F1Args) => F1Result,
  f2: (
    next: (...args: F2NextArgs) => F3Result,
  ) => (...args: F1NextArgs) => F2Result,
  f3: (
    next: (...args: F3NextArgs) => F4Result,
  ) => (...args: F2NextArgs) => F3Result,
  f4: (
    next: (...args: F4NextArgs) => F5Result,
  ) => (...args: F3NextArgs) => F4Result,
  f5: (
    next: (...args: F5NextArgs) => F6Result,
  ) => (...args: F4NextArgs) => F5Result,
  f6: (
    next: (...args: F6NextArgs) => F7Result,
  ) => (...args: F5NextArgs) => F6Result,
  f7: (
    next: (...args: F7NextArgs) => LastResult,
  ) => (...args: F6NextArgs) => F7Result,
  f8: (
    next: (...args: F8NextArgs) => LastResult,
  ) => (...args: F7NextArgs) => F8Result,
  last: (...args: F8NextArgs) => LastResult,
): (...args: F1Args) => F1Result

export function compose<
  F1Result,
  F1Args extends any[],
  F1NextArgs extends any[],
  F2NextArgs extends any[],
  F2Result,
  F3NextArgs extends any[],
  F3Result,
  F4NextArgs extends any[],
  F4Result,
  F5NextArgs extends any[],
  F5Result,
  F6NextArgs extends any[],
  F6Result,
  F7NextArgs extends any[],
  F7Result,
  F8NextArgs extends any[],
  F8Result,
  F9NextArgs extends any[],
  F9Result,
  LastResult,
>(
  f1: (
    next: (...args: F1NextArgs) => F2Result,
  ) => (...args: F1Args) => F1Result,
  f2: (
    next: (...args: F2NextArgs) => F3Result,
  ) => (...args: F1NextArgs) => F2Result,
  f3: (
    next: (...args: F3NextArgs) => F4Result,
  ) => (...args: F2NextArgs) => F3Result,
  f4: (
    next: (...args: F4NextArgs) => F5Result,
  ) => (...args: F3NextArgs) => F4Result,
  f5: (
    next: (...args: F5NextArgs) => F6Result,
  ) => (...args: F4NextArgs) => F5Result,
  f6: (
    next: (...args: F6NextArgs) => F7Result,
  ) => (...args: F5NextArgs) => F6Result,
  f7: (
    next: (...args: F7NextArgs) => LastResult,
  ) => (...args: F6NextArgs) => F7Result,
  f8: (
    next: (...args: F8NextArgs) => LastResult,
  ) => (...args: F7NextArgs) => F8Result,
  f9: (
    next: (...args: F9NextArgs) => LastResult,
  ) => (...args: F8NextArgs) => F9Result,
  last: (...args: F9NextArgs) => LastResult,
): (...args: F1Args) => F1Result

export function compose(...funcs: ((...args: any[]) => any)[]) {
  return funcs.reverse().reduce((acc, fn) => fn(acc))
}
