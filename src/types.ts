declare const any: unique symbol

/**
 * The `Any` class does not exist at runtime. It's used in type
 * definitions to detect an `any` type.
 *
 * ```ts
 * type IsAny<T> = [T] extends [Any] ? 'is any' : 'is not any'
 * ```
 */
export declare class Any {
  private any: typeof any
}

/**
 * Extracts `T` if `T` is not `any`, otherwise `never`.
 *
 * ```ts
 * type A = ExtractNotAny<any, string>
 * //   ^? never
 * type B = ExtractNotAny<string | number, string>
 * //   ^? string
 * ```
 */
export type ExtractNotAny<T, U> = Extract<[T] extends [Any] ? never : T, U>

export type SwitchAny<T, U> = [T] extends [Any] ? U : T
export type SwitchNever<T, U> = [T] extends [never] ? U : T

/**
 * Extract types in `T` that are assignable to `U`. Coerce `any` and
 * `never` types to unknown.
 */
export type StrictExtract<T, U> = SwitchNever<
  Extract<SwitchAny<T, unknown>, U>,
  unknown
>

/**
 * Resolve a type union of property name literals within type `T`
 * whose property values are assignable to type `CompatibleValue`.
 *
 * Use case: “I want to know which properties of `T` are compatible
 * with `CompatibleValue`.”
 */
export type CompatibleProperty<T, CompatibleValue> = [T] extends [Any]
  ? keyof any
  : T extends null | undefined
    ? never
    : {
        [P in keyof BoxedPrimitive<T>]: BoxedPrimitive<T>[P] extends CompatibleValue
          ? P
          : never
      }[keyof BoxedPrimitive<T>]

/**
 * Coerce a primitive type to its boxed equivalent.
 *
 * @example
 * ```ts
 * type A = BoxedPrimitive<string>
 * //   ^? String
 * type B = BoxedPrimitive<number>
 * //   ^? Number
 * ```
 */
export type BoxedPrimitive<T> = T extends string
  ? // biome-ignore lint/complexity/noBannedTypes:
    String
  : T extends number
    ? // biome-ignore lint/complexity/noBannedTypes:
      Number
    : T extends boolean
      ? // biome-ignore lint/complexity/noBannedTypes:
        Boolean
      : T extends bigint
        ? // biome-ignore lint/complexity/noBannedTypes:
          BigInt
        : T extends symbol
          ? // biome-ignore lint/complexity/noBannedTypes:
            Symbol
          : T

/**
 * A value that can be reliably compared with JavaScript comparison
 * operators (e.g. `>`, `>=`, etc).
 */
export type Comparable =
  | number
  | string
  | bigint
  | { valueOf: () => number | string | bigint }
  | { [Symbol.toPrimitive](hint: 'number'): number }
  | { [Symbol.toPrimitive](hint: 'string'): string }

/**
 * Extract a string union of property names from type `T` whose value
 * can be compared with `>`, `>=`, etc.
 */
export type ComparableProperty<T> = CompatibleProperty<T, Comparable>

/**
 * A comparator function. It can be passed to the `sort` method of
 * arrays to sort the elements.
 *
 * Return a negative number to sort the “left” value before the “right”
 * value, a positive number to sort the “right” value before the “left”
 * value, and 0 to keep the order of the values.
 */
export type Comparator<T> = (left: T, right: T) => number

/** Convert a union to an intersection */
export type Intersect<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I,
) => void
  ? I
  : never

/**
 * Useful to flatten the type output to improve type hints shown in
 * editors. And also to transform an interface into a type to aide
 * with assignability.
 *
 * @see https://github.com/microsoft/TypeScript/issues/15300
 */
export type Simplify<T> = {} & { [P in keyof T]: T[P] }

/**
 * A result tuple where the error is `undefined`.
 *
 * @example
 * ```ts
 * type GoodResult = Ok<string>
 * //   ^? [undefined, string]
 * ```
 */
export type Ok<TResult> = [err: undefined, result: TResult]

/**
 * A result tuple where an error is included.
 *
 * @example
 * ```ts
 * type BadResult = Err
 * //   ^? [Error, undefined]
 *
 * // If your mastermind plan relies on `throw null`, you're probably
 * // doing it wrong.
 * type BadResult2 = Err<Error | null>
 * //   ^? [Error | null, undefined]
 *
 * type BadResult3 = Err<TypeError | MyCoolCustomError>
 * //   ^? [TypeError | MyCoolCustomError, undefined]
 * ```
 */
export type Err<TError = Error> = [err: NonNullable<TError>, result: undefined]

/**
 * A result tuple.
 *
 * First index is the error, second index is the result.
 *
 * @example
 * ```ts
 * type MyResult = Result<string>
 * //   ^? Ok<string> | Err<Error>
 *
 * type MyResult2 = Result<string, TypeError>
 * //   ^? Ok<string> | Err<TypeError>
 * ```
 */
export type Result<TResult, TError = Error> =
  | Ok<TResult>
  | Err<NonNullable<TError>>

/**
 * A promise that resolves to a result tuple.
 *
 * @example
 * ```ts
 * type MyResult = ResultPromise<string>
 * //   ^? Promise<Ok<string> | Err<Error>>
 *
 * type MyResult2 = ResultPromise<string, TypeError>
 * //   ^? Promise<Ok<string> | Err<TypeError>>
 * ```
 */
export type ResultPromise<TResult, TError = Error> = Promise<
  [NonNullable<TError>] extends [never]
    ? Ok<TResult>
    : [TResult] extends [never]
      ? Err<NonNullable<TError>>
      : Result<TResult, NonNullable<TError>>
>
