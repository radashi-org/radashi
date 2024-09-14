/**
 * Casts the given value to an array if it's not equal to `null` or
 * `undefined`. If the value is an array, it returns a shallow copy of
 * the array. Otherwise, it returns a new array containing the value.
 *
 * @see https://radashi.js.org/reference/array/castArrayIfExists
 * @example
 * ```ts
 * castArrayIfExists(1) // => [1]
 * castArrayIfExists(null) // => null
 * castArrayIfExists(undefined) // => undefined
 * castArrayIfExists([1, 2, 3]) // => [1, 2, 3]
 * ```
 * @version 12.2.0
 */
export function castArrayIfExists<T>(value: T): CastArrayIfExists<T>
export function castArrayIfExists(value: unknown): unknown {
  return Array.isArray(value) ? value.slice() : value != null ? [value] : value
}

/**
 * The return type of the {@link castArrayIfExists} function.
 *
 * @see https://radashi.js.org/reference/array/castArrayIfExists
 */
export type CastArrayIfExists<T> = [T] extends [never]
  ? never[]
  : [unknown] extends [T]
    ? unknown[] | null | undefined
    :
        | (T extends any
            ? T extends readonly (infer U)[]
              ? U[]
              : never
            : never)
        | (Exclude<T, readonly any[] | null | undefined> extends never
            ? never
            : Exclude<T, readonly any[] | null | undefined>[])
        | Extract<T, null | undefined>
