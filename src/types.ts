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
