/**
 * Literally just `Number.isInteger` with a better type.
 *
 * @see https://radashi-org.github.io/reference/typed/isInt
 * @example
 * ```ts
 * isInt(0) // => true
 * isInt(0.1) // => false
 * ```
 */
export const isInt = Number.isInteger as (value: unknown) => value is number
