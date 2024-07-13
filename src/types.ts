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
 * A comparator function. It can be passed to the `sort` method of
 * arrays to sort the elements.
 *
 * Return a negative number to sort the “left” value before the “right”
 * value, a positive number to sort the “right” value before the “left”
 * value, and 0 to keep the order of the values.
 */
export type Comparator<T> = (left: T, right: T) => number
