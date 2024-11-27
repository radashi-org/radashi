/**
 * Return true if the given value is null or undefined.
 *
 * @see https://radashi.js.org/reference/typed/isNullish
 * @example
 * ```ts
 * isNullish(null) // => true
 * isNullish(undefined) // => true
 * isNullish('') // => false
 * isNullish(0) // => false
 * ```
 * @version 12.2.0
 */
export function isNullish(value: unknown): value is null | undefined {
  return value === null || value === undefined
}
