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
 * @see https://radashi-org.github.io/reference/function/castResult
 * @example
 * ```ts
 * const result = castResult(null, 'hello')
 * //    ^? Result<string, Error>
 *
 * const result2 = castResult(null, Promise.resolve('hello'))
 * //    ^? ResultPromise<string, Error>
 *
 * const result3 = castResult(new TypeError('hello'))
 * //    ^? Result<unknown, TypeError>
 *
 * const result4 = castResult(new TypeError('hello'), Promise.resolve('hello'))
 * //    ^? ResultPromise<string, TypeError>
 * ```
 */

// Promise<any> to ResultPromise
export function castResult<TResult, TError = Error>(
  error: Promise<TResult | Result<TResult, TError>>,
): CastResult<Promise<TResult>, TError>

// Nullish error + Promise<Result> to ResultPromise
export function castResult<const TResult, TError = Error>(
  error: null | undefined,
  value: Promise<Result<TResult, TError>>,
): CastResult<Promise<TResult>, TError>

// Nullish error + Promise to ResultPromise
export function castResult<const TResult, TError = never>(
  error: null | undefined,
  value: Promise<TResult>,
): CastResult<Promise<TResult>, TError>

// Nullish error + anything to Ok tuple
export function castResult<const TResult>(
  error: null | undefined,
  value: TResult,
): CastResult<TResult, never>

// Non-null error to Err tuple
export function castResult<TError>(
  error: NonNullable<TError>,
  value?: unknown,
): Err<TError>

// Catch-all: Possible error + anything to Result tuple
export function castResult<const TResult, TError = Error>(
  error: TError | null | undefined,
  value?: TResult | undefined,
): CastResult<TResult, NonNullable<TError>>

export function castResult(
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
 * The return type of the `castResult` function.
 *
 * Coerce a return value into either a `Result` tuple or a
 * `ResultPromise` promise.
 *
 * @see https://radashi-org.github.io/reference/function/castResult
 * @example
 * ```ts
 * type MyResult = CastResult<string>
 * //   ^? Result<string, Error>
 *
 * type MyResult2 = CastResult<Promise<string>>
 * //   ^? ResultPromise<string, Error>
 *
 * type MyResult3 = CastResult<string | Promise<string>, TypeError>
 * //   ^? Result<string, TypeError> | ResultPromise<string, TypeError>
 * ```
 */
export type CastResult<TReturn, TError = Error> = (
  [TReturn] extends [never]
    ?
        | Extract<CastResult<TError>, Err<any>>
        | (CastResult<undefined, TError> extends infer TErr
            ? TErr extends Promise<Result<any, infer TError>>
              ? Promise<Err<NonNullable<TError>>>
              : never
            : never)
    : [TError] extends [never]
      ?
          | Extract<CastResult<TReturn>, Ok<any>>
          | (CastResult<TReturn> extends infer TOk
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
