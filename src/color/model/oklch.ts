import { type Color, parseColor, toColorOKLCH } from 'radashi'

const components = ['l', 'chroma', 'hue'] as const

interface OKLCH extends Color.Type<typeof components> {}
export type { OKLCH as Type }

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/oklch
 */
export const type: OKLCH = {
  name: 'oklch',
  components,
}

export const parser: Color.Parser<typeof type, RegExpExecArray> = {
  model: type,
  regex:
    /^oklch\(([\d\.]+%?) (-?[\d\.]+%?) (-?[\d\.]+(?:deg)?)(?: *\/ *([\d\.]+))?\)$/,
  parse([, l, chroma, hue, alpha]) {
    return toColorOKLCH(l, chroma, hue, alpha)
  },
}

/**
 * Parses a color in the OKLCH colorspace. If no default value is
 * provided, the function will throw on invalid input.
 */
export function parse<TDefault = never>(
  input: string,
  defaultValue?: TDefault,
): Color.OKLCH | TDefault {
  return parseColor(input, [parser], defaultValue)
}

/**
 * Formats a color in the OKLCH colorspace.
 *
 * ```
 * import { ColorOKLCH } from 'radashi'
 *
 * const color = color(ColorOKLCH.type, 1, 1, 0.5, 0.5)
 *
 * ColorOKLCH.format(color)
 * // => 'oklch(100% 100% 0% / 0.5)'
 * ```
 */
export function format(color: Color.OKLCH): string {
  return `oklch(${color.l}% ${color.chroma}% ${color.hue}deg / ${color.alpha})`
}
