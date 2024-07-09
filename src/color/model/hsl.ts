import { type Color, parseColor, toColorHSL } from 'radashi'

const components = ['hue', 'saturation', 'lightness'] as const

interface HSL extends Color.Type<typeof components> {}
export type { HSL as Type }

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/hsl
 */
export const type: HSL = {
  name: 'hsl',
  components,
}

export const parser: Color.Parser<typeof type, RegExpExecArray> = {
  model: type,
  regex: /^hsl\(([\d\.]+(?:deg)?) ([\d\.]+%) ([\d\.]+%)(?: *\/ *([\d\.]+))?\)$/,
  parse([, hue, saturation, lightness, alpha]) {
    return toColorHSL(hue, saturation, lightness, alpha)
  },
}

/**
 * Parses a color in the HSL colorspace. If no default value is
 * provided, the function will throw on invalid input.
 */
export function parse<TDefault = never>(
  input: string,
  defaultValue?: TDefault,
): Color.HSL | TDefault {
  return parseColor(input, [parser], defaultValue)
}

/**
 * Formats a color in the HSL colorspace.
 *
 * ```
 * import { ColorHSL } from 'radashi'
 *
 * const color = color(ColorHSL.type, 1, 1, 0.5, 0.5)
 *
 * ColorHSL.format(color)
 * // => 'hsl(255 100% 50% / 0.5)'
 * ```
 */
export function format(color: Color.HSL): string {
  return `hsl(${color.hue} ${color.saturation}% ${color.lightness}% / ${color.alpha})`
}
