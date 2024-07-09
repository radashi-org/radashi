import { type Color, selectFirst } from 'radashi'

/**
 * Parses a color string to a color object using the given parsers.
 *
 * If you know the format of the color string, you can use the parser
 * directly with `ColorHex.parse()` for example.
 *
 * ```
 * parseColor('#fff', [ColorHex.parser, ColorRGB.parser])
 * // => Color { red: 1, green: 1, blue: 1, alpha: 1 }
 *
 * parseColor('#fff', [ColorRGB.parser])
 * // throws an error
 *
 * parseColor('#fff', [ColorRGB.parser], '#000')
 * // => '#000'
 * ```
 */
export function parseColor<T extends Color.Type, TDefault = never>(
  input: string,
  parsers: Color.Parser<T>[],
  defaultValue?: TDefault,
): Color<T> | TDefault

export function parseColor(
  input: string,
  parsers: Color.Parser<any>[],
  defaultValue?: any,
): any {
  const parsedColor = selectFirst(parsers, parser => {
    if ('regex' in parser) {
      const match = parser.regex.exec(input)
      return match ? parser.parse(match) : undefined
    }
    return parser.parse(input)
  })
  if (parsedColor) {
    return parsedColor
  }
  if (defaultValue !== undefined) {
    return defaultValue
  }
  throw new Error('Invalid color string: ' + input)
}
