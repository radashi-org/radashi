import { type Color, denormalize, parseColor, toColorLAB } from 'radashi'

const components = ['lightness', 'a', 'b'] as const

interface LAB extends Color.Type<typeof components> {}
export type { LAB as Type }

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/lab
 */
export const type: LAB = {
  name: 'lab',
  components,
}

export const abRange = [-125, 125] as const

export const parser: Color.Parser<typeof type, RegExpExecArray> = {
  model: type,
  regex: /^lab\(([\d\.]+%?) (-?[\d\.]+%?) (-?[\d\.]+%?)(?: *\/ *([\d\.]+))?\)$/,
  parse([, lightness, a, b, alpha]) {
    return toColorLAB(lightness, a, b, alpha)
  },
}

/**
 * Parses a color in the LAB colorspace. If no default value is
 * provided, the function will throw on invalid input.
 */
export function parse<TDefault = never>(
  input: string,
  defaultValue?: TDefault,
): Color.LAB | TDefault {
  return parseColor(input, [parser], defaultValue)
}

/**
 * Formats a color in the LAB colorspace.
 *
 * ```
 * import { ColorLAB } from 'radashi'
 *
 * const color = color(ColorLAB.type, 1, 0, 1, 0.5)
 *
 * ColorLAB.format(color)
 * // => 'lab(100% 0 125 / 0.5)'
 * ```
 */
export function format(color: Color.LAB): string {
  return `lab(${color.lightness * 100}% ${denormalize(color.a, abRange)} ${denormalize(color.b, abRange)} / ${color.alpha})`
}
