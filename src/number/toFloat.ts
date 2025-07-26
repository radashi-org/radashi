import { isSymbol } from 'radashi'

/**
 * Combines `Number.parseFloat` with NaN handling. By default, a zero
 * (0) is returned in place of NaN.
 *
 * @see https://radashi.js.org/reference/number/toFloat
 * @example
 * ```ts
 * toFloat("1.23") // => 1.23
 * toFloat("foo") // => 0
 * toFloat("1.23px", 1) // => 1.23
 * toFloat("foo", 1) // => 1
 * ```
 * @version 12.1.0
 */
export function toFloat(value: unknown): number

export function toFloat<T>(
  value: unknown,
  defaultValue: T | undefined,
): number | T

export function toFloat<T>(
  value: any,
  defaultValue?: T,
): number | Exclude<T, undefined> {
  // Symbols throw on string coercion, which parseFloat does.
  const parsedValue = isSymbol(value) ? Number.NaN : Number.parseFloat(value)
  return Number.isNaN(parsedValue)
    ? defaultValue !== undefined
      ? (defaultValue as Exclude<T, undefined>)
      : 0
    : parsedValue
}
