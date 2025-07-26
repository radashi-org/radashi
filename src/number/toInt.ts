import { isSymbol } from 'radashi'

/**
 * Combines `Number.parseInt` with NaN handling. By default, a zero
 * (0) is returned in place of NaN.
 *
 * @see https://radashi.js.org/reference/number/toInt
 * @example
 * ```ts
 * toInt("1.23") // => 1
 * toInt("foo") // => 0
 * toInt("1.23px", 1) // => 1
 * toInt("foo", -1) // => -1
 * ```
 * @version 12.1.0
 */
export function toInt(value: unknown): number

export function toInt<T>(
  value: unknown,
  defaultValue: T | undefined,
): number | T

export function toInt<T>(
  value: any,
  defaultValue?: T,
): number | Exclude<T, undefined> {
  // Symbols throw on string coercion, which parseInt does.
  const parsedValue = isSymbol(value) ? Number.NaN : Number.parseInt(value)
  return Number.isNaN(parsedValue)
    ? defaultValue !== undefined
      ? (defaultValue as Exclude<T, undefined>)
      : 0
    : parsedValue
}
