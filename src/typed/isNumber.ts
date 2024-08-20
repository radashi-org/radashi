/**
 * Return true if the given value is a number.
 *
 * @see https://radashi.js.org/reference/typed/isNumber
 * @example
 * ```ts
 * isNumber(0) // => true
 * isNumber('0') // => false
 * isNumber(NaN) // => false
 * ```
 */
export function isNumber(value: unknown): value is number {
	return typeof value === "number" && !Number.isNaN(value);
}
