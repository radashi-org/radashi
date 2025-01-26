import { assign, isString } from 'radashi'

export type QuantityParserOptions<
  Unit extends string = string,
  ShortUnit extends string = string,
> = {
  /**
   * Unit mapping to their base conversion values
   */
  units: Record<Unit, number>
  /**
   * Short aliases for units
   */
  short?: Record<ShortUnit, Unit>
}

/**
 * Parses a human quantity string into its numeric value.
 *
 * Units are assigned a multiplier. Short aliases are supported.
 *
 * For repeated use, consider using `new QuantityParser()` directly.
 * There also exists `DurationParser` and `parseDuration` for parsing
 * human-readable duration strings.
 *
 * @see https://radashi.js.org/reference/number/parseQuantity
 * @example
 * ```ts
 * parseQuantity("1rem", {
 *   units: { pixel: 1, "relative em": 16 },
 *   short: { px: "pixel", rem: "relative em" },
 * }) // => 16
 * ```
 */
export function parseQuantity<
  Unit extends string,
  ShortUnit extends string = never,
>(
  quantity: QuantityString<Unit, ShortUnit> | number,
  options: QuantityParserOptions<Unit, ShortUnit>,
): number {
  return isString(quantity)
    ? new QuantityParser(options).parse(quantity)
    : quantity
}

/**
 * The parser for human-readable quantity strings.
 *
 * Used by `parseQuantity`.
 */
export class QuantityParser<
  Unit extends string,
  ShortUnit extends string = never,
> {
  protected options: QuantityParserOptions<Unit, ShortUnit>

  constructor(options: QuantityParserOptions<Unit, ShortUnit>) {
    const defaults =
      'defaults' in this.constructor
        ? (this.constructor.defaults as QuantityParserOptions)
        : null

    this.options =
      defaults && options !== defaults
        ? ((options
            ? assign(defaults, options)
            : defaults) as QuantityParserOptions<Unit, ShortUnit>)
        : options
  }

  /**
   * Parse a quantity string into its numeric value
   *
   * @throws {Error} If the quantity string is invalid or contains an unknown unit
   */
  parse(quantity: QuantityString<Unit, ShortUnit>): number {
    const match = quantity.match(/^(-?\d+(?:\.\d+)?) ?(\w+)?s?$/)
    if (!match) {
      throw new Error(`Invalid quantity, cannot parse: ${quantity}`)
    }

    const { units, short } = this.options

    let unit = match[2] as Unit | ShortUnit
    unit = short && unit in short ? short[unit as ShortUnit] : (unit as Unit)

    const count = Number.parseFloat(match[1])
    if (Math.abs(count) > 1 && unit.endsWith('s')) {
      unit = unit.substring(0, unit.length - 1) as Unit
    }

    if (!units[unit]) {
      throw new Error(
        `Received unknown unit "${unit}", expected one of: ${Object.keys(units).join(', ')}`,
      )
    }

    return count * units[unit]
  }
}

/**
 * Human-readable quantity string, derived from the `QuantityParser`
 * options.
 */
export type QuantityString<
  Unit extends string,
  ShortUnit extends string = never,
> = `${1 | -1} ${Unit}` | `${number} ${Unit}s` | `${number}${ShortUnit}`

/**
 * Given a quantity parser, returns the type of the quantity string it
 * can parse.
 */
export type ParsedQuantity<Parser extends QuantityParser<any, any>> =
  Parser extends QuantityParser<infer Unit, infer ShortUnit>
    ? QuantityString<Unit, ShortUnit>
    : never
