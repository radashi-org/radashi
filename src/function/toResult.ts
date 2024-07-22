import {
  type Err,
  isPromise,
  isResult,
  type Ok,
  type Promisable,
  type Result,
  type ResultPromise,
} from 'radashi'

const resultPromiseSymbol: unique symbol = Symbol()

/**
 * Coerce a return value into either a `Result` tuple or a
 * `ResultPromise` promise.
 *
 * @see https://radashi-org.github.io/reference/function/toResult
 * @example
 * ```ts
 * const result = toResult(null, 'hello')
 * //    ^? Result<string, Error>
 *
 * const result2 = toResult(null, Promise.resolve('hello'))
 * //    ^? ResultPromise<string, Error>
 *
 * const result3 = toResult(new TypeError('hello'))
 * //    ^? Result<unknown, TypeError>
 *
 * const result4 = toResult(new TypeError('hello'), Promise.resolve('hello'))
 * //    ^? ResultPromise<string, TypeError>
 * ```
 */

// Promise<any> to ResultPromise
export function toResult<TResult, TError = Error>(
  error: Promise<TResult | Result<TResult, TError>>,
): ToResult<Promise<TResult>, TError>

// Nullish error + Promise<Result> to ResultPromise
export function toResult<const TResult, TError = Error>(
  error: null | undefined,
  value: Promise<Result<TResult, TError>>,
): ToResult<Promise<TResult>, TError>

// Nullish error + Promise to ResultPromise
export function toResult<const TResult, TError = never>(
  error: null | undefined,
  value: Promise<TResult>,
): ToResult<Promise<TResult>, TError>

// Nullish error + anything to Ok tuple
export function toResult<const TResult>(
  error: null | undefined,
  value: TResult,
): ToResult<TResult, never>

// Non-null error to Err tuple
export function toResult<TError>(
  error: NonNullable<TError>,
  value?: unknown,
): Err<TError>

// Catch-all: Possible error + anything to Result tuple
export function toResult<const TResult, TError = Error>(
  error: TError | null | undefined,
  value?: TResult | undefined,
): ToResult<TResult, NonNullable<TError>>

export function toResult(
  error: unknown,
  value?: unknown,
): Promisable<Result<any, any>> {
  const inputPromise = isPromise(error)
    ? error
    : isPromise(value)
      ? value
      : null

  if (inputPromise) {
    let resultPromise: Promise<Result<any, any>> & {
      [resultPromiseSymbol]?: true
    }

    if (error && error !== inputPromise) {
      // The input promise is completely ignored when an error is also passed.
      resultPromise = Promise.resolve([error, undefined])
    } else {
      // Reuse existing promise if it's a ResultPromise.
      resultPromise =
        resultPromiseSymbol in inputPromise
          ? (inputPromise as Promise<Result<any, any>>)
          : inputPromise.then(
              (resolved): Result<any, any> =>
                isResult(resolved) ? resolved : [undefined, resolved],
              (error): Err => [error, undefined],
            )
    }

    resultPromise[resultPromiseSymbol] = true
    return resultPromise
  }

  return error != null ? [error, undefined] : [undefined, value]
}

/**
 * The return type of the `toResult` function.
 *
 * Coerce a return value into either a `Result` tuple or a
 * `ResultPromise` promise.
 *
 * @see https://radashi-org.github.io/reference/function/toResult
 * @example
 * ```ts
 * type MyResult = ToResult<string>
 * //   ^? Result<string, Error>
 *
 * type MyResult2 = ToResult<Promise<string>>
 * //   ^? ResultPromise<string, Error>
 *
 * type MyResult3 = ToResult<string | Promise<string>, TypeError>
 * //   ^? Result<string, TypeError> | ResultPromise<string, TypeError>
 * ```
 */
export type ToResult<TReturn, TError = Error> = (
  [TReturn] extends [never]
    ?
        | Extract<ToResult<TError>, Err<any>>
        | (ToResult<undefined, TError> extends infer TErr
            ? TErr extends Promise<Result<any, infer TError>>
              ? Promise<Err<NonNullable<TError>>>
              : never
            : never)
    : [TError] extends [never]
      ?
          | Extract<ToResult<TReturn>, Ok<any>>
          | (ToResult<TReturn> extends infer TOk
              ? TOk extends Promise<infer TResult>
                ? Promise<Ok<TResult>>
                : never
              : never)
      : [TReturn] extends [Promise<never>]
        ? Promise<Err<TError>>
        : TReturn extends Result<any, any> | ResultPromise<any, any>
          ? TReturn
          : TReturn extends Promise<infer TResult>
            ? ResultPromise<TResult, NonNullable<TError>>
            : Result<TReturn, NonNullable<TError>>
) extends infer T
  ? //
    // Declare a combined Result type if any are sync results.
      | ([Extract<T, Result<any, any>>] extends [infer TResultTuple]
          ? [TResultTuple] extends [never]
            ? never
            : [
                  TResultTuple extends Result<infer TResult, any>
                    ? Exclude<TResult, undefined>
                    : never,
                  TResultTuple extends Result<any, infer TError>
                    ? NonNullable<TError>
                    : never,
                ] extends [infer TResult, infer TError]
              ? [TError] extends [never]
                ? Ok<TResult>
                : [TResult] extends [never]
                  ? Err<TError>
                  : Result<TResult, TError>
              : never
          : never)
      //
      // Declare a combined ResultPromise type if any are async results.
      | ([Extract<T, ResultPromise<any, any>>] extends [infer TPromise]
          ? [TPromise] extends [never]
            ? never
            : ResultPromise<
                TPromise extends Promise<infer TResolved>
                  ? Exclude<ToResultValue<TResolved>, undefined>
                  : never,
                TPromise extends Promise<infer TResolved>
                  ? NonNullable<ToResultError<TResolved>>
                  : never
              >
          : never)
  : never

type ToResultValue<T> = T extends Result<infer TResult, any>
  ? ToResultValue<TResult>
  : T

type ToResultError<T> = T extends Result<any, infer TError> ? TError : never
