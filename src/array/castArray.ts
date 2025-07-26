/**
 * Casts the given value to an array. If the value is already an
 * array, a shallow copy is returned. Otherwise, a new array
 * containing the value is returned.
 *
 * @see https://radashi.js.org/reference/array/castArray
 * @example
 * ```ts
 * castArray(1) // => [1]
 * castArray([1, 2]) // => [1, 2]
 * castArray(null) // => [null]
 * castArray(undefined) // => [undefined]
 * ```
 * @version 12.2.0
 */
export function castArray<T>(value: T): CastArray<T>
export function castArray(value: unknown): unknown {
  return Array.isArray(value) ? value.slice() : [value]
}

/**
 * The return type of the {@link castArray} function.
 *
 * @see https://radashi.js.org/reference/array/castArray
 */
export type CastArray<T> = [T] extends [never]
  ? never[]
  : [unknown] extends [T]
    ? unknown[]
    :
        | (T extends any
            ? T extends readonly (infer U)[]
              ? U[]
              : never
            : never)
        | (Exclude<T, readonly any[]> extends never
            ? never
            : Exclude<T, readonly any[]>[])
