import { isArray, isPromise } from 'radashi'

/** Error type */
export type Left<E = Error> = [E, undefined]

/** Succeeded type */
export type Right<T = unknown> = [undefined, T]

/** Either errored (left) or succeeded (right) type */
export type Either<T = unknown, E = Error> = Left<E> | Right<T>

/** Task = async Either */
export type Task<T = unknown, E = Error> = Promise<Either<T, E>>

/** syncEither or async Task */
export type TaskOrEither<T, E> = T extends Promise<infer R>
  ? Task<R, E>
  : Either<T, E>

export const isEither = (either: any): either is Either => {
  return (
    !isPromise(either) &&
    isArray(either) &&
    either.length === 2 &&
    (either[0] instanceof Error || either[0] === undefined)
  )
}

/** returns `true` it the result is an error */
export const isLeft = <T = unknown, E = Error>(
  either: Either<T, E>,
): either is Left<E> => isEither(either) && either[0] !== undefined

/** returns `true` it the result is NOT an error */
export const isRight = <T = unknown, E = Error>(
  either: Either<T, E>,
): either is Right<T> => isEither(either) && either[0] === undefined

/** returns the error component of the either */
export const left = <T = unknown, E = Error>(either: Either<T, E>): E =>
  either[0] as E

/** returns the result component of the either */
export const right = <T = unknown, E = Error>(either: Either<T, E>): T =>
  either[1] as T

/** Create an errored result */
export const createLeft = <E extends Error>(error: E): Left<Error> => [
  error,
  undefined,
]

/** Create an succeeded result */
export const createRight = <T = unknown>(result: T): Right<T> => [
  undefined,
  result,
]

/**
 * A helper to try an async function without forking the control flow.
 * Returns an error-first callback-_like_ array response as `[Error,
 * result]`
 */
export const tryit = <T, Args extends any[] = unknown[], E = Error>(
  func: (...args: Args) => T,
): ((...args: Args) => TaskOrEither<T, E>) => {
  return (...args: Args): TaskOrEither<T, E> => {
    try {
      const result = func(...args)
      if (isPromise(result)) {
        return result
          .then(value => createRight(value))
          .catch(err =>
            createLeft(
              err instanceof Error ? err : new Error(JSON.stringify(err)),
            ),
          ) as TaskOrEither<T, E>
      }
      return createRight(result) as TaskOrEither<T, E>
    } catch (err) {
      return createLeft(
        err instanceof Error ? err : new Error(JSON.stringify(err)),
      ) as TaskOrEither<T, E>
    }
  }
}

export { tryit as try }
