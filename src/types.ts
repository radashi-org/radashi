import type { BigInt, BigInt64Array, BigUint64Array } from './bigint'

/**
 * Represents values that are considered "falsy" in JavaScript. These
 * values cause the condition in an `if` statement or ternary
 * expression to be false, leading to the execution of the `else`
 * branch.
 */
export type Falsy = null | undefined | false | '' | 0 | 0n

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
 * Represents a class constructor.
 */
export type Class<TArgs extends any[] = any[], TReturn = any> = new (
  ...args: TArgs
) => TReturn

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
 * whose property values are assignable to type `TConstraint`. If `T`
 * is a primitive, it's first transformed into its boxed equivalent
 * (e.g. `string` becomes `String`, `number` becomes `Number`, and so
 * on).
 *
 * Use case: “I want to know which properties of `T` are compatible
 * with `TConstraint`.”
 */
export type CompatibleProperty<T, TConstraint> = [T] extends [Any]
  ? keyof any
  : T extends null | undefined
    ? never
    : (T extends object ? T : BoxedPrimitive<T>) extends infer TObject
      ? {
          [P in keyof TObject]: TObject[P] extends TConstraint ? P : never
        }[keyof TObject]
      : never

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
 * Note that `TError` is non-nullable, which means that
 * `Err<undefined>` and `Err<null>` are not valid.
 *
 * @example
 * ```ts
 * type BadResult = Err
 * //   ^? [Error, undefined]
 *
 * type BadResult2 = Err<TypeError | MyCoolCustomError>
 * //   ^? [TypeError | MyCoolCustomError, undefined]
 * ```
 */
export type Err<TError extends Error = Error> = [err: TError, result: undefined]

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
export type Result<TResult, TError extends Error = Error> =
  | Ok<TResult>
  | Err<TError>

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
export type ResultPromise<TResult, TError extends Error = Error> = Promise<
  [TError] extends [never]
    ? Ok<TResult>
    : [TResult] extends [never]
      ? Err<TError>
      : Result<TResult, TError>
>

/**
 * Get all properties **not using** the `?:` type operator.
 */
export type RequiredKeys<T> = T extends any
  ? keyof T extends infer K
    ? K extends keyof T
      ? Omit<T, K> extends T
        ? never
        : K
      : never
    : never
  : never

/**
 * Get all properties using the `?:` type operator.
 */
export type OptionalKeys<T> = T extends any
  ? keyof T extends infer K
    ? K extends keyof T
      ? Omit<T, K> extends T
        ? K
        : never
      : never
    : never
  : never

/**
 * Resolves to `true` if `Left` and `Right` are exactly the same type.
 *
 * Otherwise false.
 */
export type IsExactType<Left, Right> = [Left] extends [Any]
  ? [Right] extends [Any]
    ? true
    : false
  : (<U>() => U extends Left ? 1 : 0) extends <U>() => U extends Right ? 1 : 0
    ? true
    : false

export type Primitive =
  | number
  | string
  | boolean
  | symbol
  | bigint
  | null
  | undefined
  | void

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
export type BoxedPrimitive<T = any> = T extends string
  ? // biome-ignore lint:
    String
  : T extends number
    ? // biome-ignore lint:
      Number
    : T extends boolean
      ? // biome-ignore lint:
        Boolean
      : T extends bigint
        ? BigInt
        : T extends symbol
          ? // biome-ignore lint:
            Symbol
          : never

export type TypedArray =
  | Int8Array
  | Uint8Array
  | Uint8ClampedArray
  | Int16Array
  | Uint16Array
  | Int32Array
  | Uint32Array
  | Float32Array
  | Float64Array
  | BigInt64Array
  | BigUint64Array
  | DataView
  | ArrayBuffer
  | SharedArrayBuffer

/**
 * Add your own classes to this registry by extending its interface
 * with what's called “declaration merging” in TypeScript.
 *
 * All property types in this registry type may be treated specially
 * by any of Radashi's complex types. For example, `assign` will avoid
 * merging with types in this registry.
 */
// biome-ignore lint: Preserve `interface` type.
export interface CustomClassRegistry {}

/**
 * This type represents any custom class that was "registered" through
 * the `CustomClassRegistry` type.
 */
export type CustomClass = CustomClassRegistry[keyof CustomClassRegistry]

/**
 * These types are implemented natively.
 *
 * Note that boxed primitives like `Boolean` (different from
 * `boolean`) are not included, because `boolean extends Boolean ? 1 :
 * 0` resolves to 1.
 */
export type BuiltInType =
  | ES2021.BuiltInType
  | WebAPI.BuiltInType
  | NodeJS.BuiltInType

// Start at ES2020, since they are the typings used by Radashi.
declare namespace ES2020 {
  // Note: Don't include subtypes of types already listed here.
  type BuiltInType =
    | Primitive
    | Promise<any>
    | Date
    | RegExp
    | Error
    | readonly any[]
    | ReadonlyMap<any, any>
    | ReadonlySet<any>
    | WeakMap<WeakKey, any>
    | WeakSet<WeakKey>
    | TypedArray
    // biome-ignore lint: Support the Function type.
    | Function
}

declare namespace ES2021 {
  // Note: Don't include subtypes of types already listed here.
  type BuiltInType =
    | ES2020.BuiltInType
    | GlobalObjectType<'FinalizationRegistry'>
    | GlobalObjectType<'WeakRef'>
}

declare namespace NodeJS {
  type BuiltInType = GlobalObjectType<'Buffer'>
}

declare namespace WebAPI {
  // Note: Don't include subtypes of types already listed here.
  type BuiltInType =
    | GlobalObjectType<'AbortController'>
    | GlobalObjectType<'AbortSignal'>
    | GlobalObjectType<'Blob'>
    | GlobalObjectType<'Body'>
    | GlobalObjectType<'CompressionStream'>
    | GlobalObjectType<'Crypto'>
    | GlobalObjectType<'CustomEvent'>
    | GlobalObjectType<'DecompressionStream'>
    | GlobalObjectType<'Event'>
    | GlobalObjectType<'EventTarget'> // <-- Watch out for subtypes of this.
    | GlobalObjectType<'FormData'>
    | GlobalObjectType<'Headers'>
    | GlobalObjectType<'MessageChannel'>
    | GlobalObjectType<'Navigator'>
    | GlobalObjectType<'ReadableStream'>
    | GlobalObjectType<'ReadableStreamBYOBReader'>
    | GlobalObjectType<'ReadableStreamDefaultController'>
    | GlobalObjectType<'ReadableStreamDefaultReader'>
    | GlobalObjectType<'SubtleCrypto'>
    | GlobalObjectType<'TextDecoder'>
    | GlobalObjectType<'TextDecoderStream'>
    | GlobalObjectType<'TextEncoder'>
    | GlobalObjectType<'TextEncoderStream'>
    | GlobalObjectType<'TransformStream'>
    | GlobalObjectType<'TransformStreamDefaultController'>
    | GlobalObjectType<'URL'>
    | GlobalObjectType<'URLSearchParams'>
    | GlobalObjectType<'WebSocket'>
    | GlobalObjectType<'WritableStream'>
    | GlobalObjectType<'WritableStreamDefaultController'>
    | GlobalObjectType<'WritableStreamDefaultWriter'>
    | WebDocumentAPI.BuiltInType
}

declare namespace WebDocumentAPI {
  // Note: Don't include subtypes of types already listed here.
  type BuiltInType =
    | GlobalObjectType<'Node'>
    | GlobalObjectType<'NodeList'>
    | GlobalObjectType<'NodeIterator'>
    | GlobalObjectType<'HTMLCollection'>
    | GlobalObjectType<'CSSStyleDeclaration'>
    | GlobalObjectType<'DOMStringList'>
    | GlobalObjectType<'DOMTokenList'>
}

// Infer an object type from a global constructor that is
// environment-specific. This helps avoid including unsupported types
// (according to tsconfig "lib" property), which can break things.
type GlobalObjectType<Identifier extends string> = [Identifier] extends [Any]
  ? never
  : keyof Identifier extends never
    ? never
    : typeof globalThis extends { [P in Identifier]: any }
      ? InstanceType<(typeof globalThis)[Identifier]>
      : never
