type MayBePromise<T> = T | Promise<T>

// First function can have multiple arguments
type FirstInputFunc<TArg extends any[], TResult> = (
  ...arg: TArg
) => MayBePromise<TResult>

// Rest of the functions will accept a single input,
// the input is the output of previous function.
type MixedFunc<TArg = unknown, TResult = unknown> = (
  arg: TArg,
) => MayBePromise<TResult>

// Recursively Check:
// - Extract `F` & `R` from `Rest` param. F is next function, R is the remaining
// - Extact `I` as input of `F` and `O` as output
// - Check if previous result `Current` is assignable to I
//   - if yes, do next recursion
//   - If no, build final callable type: `(...args: A) => Promise<Current>`
type ChainedHelper<
  Current,
  Rest extends MixedFunc[],
  A extends any[],
> = Rest extends [infer F, ...infer R]
  ? F extends (arg: infer I) => MayBePromise<infer O>
    ? [Current] extends [I]
      ? R extends MixedFunc[]
        ? ChainedHelper<O, R, A>
        : never
      : never
    : never
  : (...args: A) => Promise<Current>

// Return type of promiseChain.
type Chained<Funcs extends [FirstInputFunc<any[], any>, ...MixedFunc[]]> =
  Funcs extends [infer F1, ...infer Rest]
    ? F1 extends (...args: infer A) => MayBePromise<infer B>
      ? Rest extends MixedFunc[]
        ? ChainedHelper<B, Rest, A>
        : never
      : never
    : never

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
 * chained(2, 3) // "Your Value is 10"
 * ```
 * @version 12.1.0
 */
export function promiseChain<
  Funcs extends [FirstInputFunc<any[], any>, ...MixedFunc[]],
>(...funcs: Funcs): Chained<Funcs> {
  return async function chained(...args: unknown[]) {
    let result = await funcs[0](...args)

    for (let i = 1; i < funcs.length; i++) {
      result = await funcs[i](result)
    }

    return result
  } as Chained<Funcs>
}
