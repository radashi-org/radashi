/**
 * Literally just `Number.isInteger` with a better type.
 *
 * @see https://radashi.js.org/reference/typed/isInt
 * @example
 * ```ts
 * isInt(0) // => true
 * isInt(0.1) // => false
 * ```
 * @version 12.1.0
 */
export const isInt = /* @__PURE__ */ (() => Number.isInteger)() as (
  value: unknown,
) => value is number
