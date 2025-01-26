import {
  isString,
  type ParsedQuantity,
  QuantityParser,
  type QuantityParserOptions,
} from 'radashi'

/**
 * Parses a human-readable duration string into milliseconds.
 *
 * For repeated use, consider using `new DurationParser()` directly.
 *
 * @see https://radashi.js.org/reference/number/parseDuration
 * @example
 * ```ts
 * parseDuration("1 second") // => 1_000
 * parseDuration("1h") // => 3_600_000
 * parseDuration("1 hour") // => 3_600_000
 * parseDuration("1.5 hours") // => 5_400_000
 * parseDuration("-1h") // => -3_600_000
 * parseDuration(500) // => 500
 * ```
 */
export function parseDuration<
  Unit extends string = never,
  ShortUnit extends string = never,
>(
  humanDuration: DurationString<Unit, ShortUnit> | number,
  /**
   * Optionally add custom units and short aliases for them.
   */
  options?: QuantityParserOptions<Unit, ShortUnit>,
): number {
  return isString(humanDuration)
    ? new DurationParser(options).parse(humanDuration)
    : humanDuration
}

/**
 * The parser for human-readable duration strings.
 *
 * Used by `parseDuration`.
 */
export class DurationParser<
  Unit extends string = never,
  ShortUnit extends string = never,
> extends QuantityParser<
  Unit | keyof typeof DurationParser.defaults.units,
  ShortUnit | keyof typeof DurationParser.defaults.short
> {
  // Allows adding custom units, but it's not required.
  constructor(options?: QuantityParserOptions<Unit, ShortUnit>) {
    // For type safety, QuantityParser requires an options object, but
    // it's not required at runtime if defaults are defined.
    super(options as any)
  }

  static defaults = {
    units: {
      week: 604_800_000,
      day: 86_400_000,
      hour: 3_600_000,
      minute: 60_000,
      second: 1_000,
      millisecond: 1,
    },
    short: {
      w: 'week',
      d: 'day',
      h: 'hour',
      m: 'minute',
      s: 'second',
      ms: 'millisecond',
    },
  } as const
}

/**
 * Human-readable duration string, derived from the `DurationParser`
 * options.
 */
export type DurationString<
  Unit extends string = never,
  ShortUnit extends string = never,
> = ParsedQuantity<DurationParser<Unit, ShortUnit>>
