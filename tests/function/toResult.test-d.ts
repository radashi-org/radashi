import type { Err, Ok, Result, ResultPromise } from 'radashi'
import * as _ from 'radashi'

class MyError extends Error {
  name = 'MyError' as const
}

describe('_.toResult', () => {
  test('error type is preserved', () => {
    const result = _.toResult(new MyError('error'))
    expectTypeOf(result).toEqualTypeOf<Err<MyError>>()
  })

  test('union of all possible values', async () => {
    type TError = Error | string | undefined
    type TResult = Promise<1 | Ok<2>> | 3 | Ok<4>

    const result = _.toResult({} as TError | null, {} as TResult)
    expectTypeOf(result).toEqualTypeOf<
      | ResultPromise<1 | 2, NonNullable<TError>>
      | Result<3 | 4, NonNullable<TError>>
    >()

    // Awaited<typeof result>
    const resolved = await result
    expectTypeOf(resolved).toEqualTypeOf<
      Err<NonNullable<TError>> | Ok<4 | 3> | Ok<2 | 1>
    >()
  })

  test('promise value', async () => {
    const promise: Promise<string> = Promise.resolve('hello')

    const result = _.toResult(null, promise)
    expectTypeOf(result).toEqualTypeOf<ResultPromise<string, never>>()
    expectTypeOf(result).toEqualTypeOf<Promise<Ok<string>>>()

    const result2 = _.toResult(new Error(), promise)
    expectTypeOf(result2).toEqualTypeOf<Err<Error>>()

    const result3 = _.toResult({} as Error | null, promise)
    expectTypeOf(result3).toEqualTypeOf<ResultPromise<string, Error>>()

    const result4 = await result3
    expectTypeOf(result4).toEqualTypeOf<Result<string, Error>>()

    const result5 = _.toResult({} as Promise<never>)
    expectTypeOf(result5).toEqualTypeOf<ResultPromise<never, Error>>()
    expectTypeOf(result5).toEqualTypeOf<Promise<Err<Error>>>()
  })

  test('promise error', () => {
    const promise: Promise<unknown> = Promise.reject(new Error())
    const result = _.toResult(promise)
    expectTypeOf(result).toEqualTypeOf<ResultPromise<unknown>>()
  })

  test('explicit error and value types are preserved', () => {
    const result = _.toResult<string, MyError>(new MyError(), 'hello')
    expectTypeOf(result).toEqualTypeOf<Result<string, MyError>>()
  })

  test('null or undefined error with non-promise value', () => {
    const result1 = _.toResult(null, 42)
    expectTypeOf(result1).toEqualTypeOf<Ok<42>>()

    const result2 = _.toResult(undefined, 42)
    expectTypeOf(result2).toEqualTypeOf<Ok<42>>()
  })

  test('non-null error with undefined value', () => {
    const result = _.toResult(new Error())
    expectTypeOf(result).toEqualTypeOf<Err<Error>>()

    const result2 = _.toResult(new MyError())
    expectTypeOf(result2).toEqualTypeOf<Err<MyError>>()
  })

  test('explicit type parameters', () => {
    const result = _.toResult<string, MyError>(null, 'hello')
    expectTypeOf(result).toEqualTypeOf<Result<string, MyError>>()

    const result2 = _.toResult<string, never>(null, 'hello')
    expectTypeOf(result2).toEqualTypeOf<Ok<string>>()

    const result3 = _.toResult<never, Error>(new Error())
    expectTypeOf(result3).toEqualTypeOf<Err<Error>>()

    const result4 = _.toResult<string, MyError>(null, Promise.resolve('hello'))
    expectTypeOf(result4).toEqualTypeOf<ResultPromise<string, MyError>>()
  })

  test('primitive error value', () => {
    const result = _.toResult('my error')
    expectTypeOf(result).toEqualTypeOf<Err<'my error'>>()

    const result2 = _.toResult('my error' as string)
    expectTypeOf(result2).toEqualTypeOf<Err<string>>()

    const result3 = _.toResult('my error' as string | null, 1)
    expectTypeOf(result3).toEqualTypeOf<Result<1, string>>()
  })
})
