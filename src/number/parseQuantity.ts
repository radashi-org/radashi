import { QuantityParser, type QuantityString } from 'radashi'
import type { parseDuration } from './parseDuration'

/**
 * Parse a quantity string into its numeric value. You must provide a
 * unit conversion map.
 *
 * Note that {@link parseDuration `parseDuration`} also exists, which
 * can be used to parse duration strings (like `1d` or `1 day`).
 *
 * @see https://radashi.js.org/reference/number/parseQuantity
 * @version 12.6.0
 */
export function parseQuantity<
  TUnit extends string,
  TShortUnit extends string = never,
>(
  quantity: QuantityString<TUnit, TShortUnit>,
  options: QuantityParser.Options<TUnit, TShortUnit>,
): number {
  return new QuantityParser(options).parse(quantity)
}
