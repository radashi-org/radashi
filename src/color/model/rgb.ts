import { type Color, parseColor, toColorRGB } from 'radashi'

const components = ['red', 'green', 'blue'] as const

interface RGB extends Color.Type<typeof components> {}
export type { RGB as Type }

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/rgb
 */
export const type: RGB = {
  name: 'rgb',
  components,
}

export const parser: Color.Parser<typeof type, RegExpExecArray> = {
  model: type,
  regex:
    /^rgba?\(([\d\.]+)[, ]+([\d\.]+)[, ]+([\d\.]+)(?: *[,/] *([\d\.]+))?\)$/,
  parse([, red, green, blue, alpha]) {
    return toColorRGB(red, green, blue, alpha)
  },
}

/**
 * Parses a color in the RGB colorspace. If no default value is
 * provided, the function will throw on invalid input.
 */
export function parse<TDefault = never>(
  input: string,
  defaultValue?: TDefault,
): Color.RGB | TDefault {
  return parseColor(input, [parser], defaultValue)
}

const normalize = (n: number) => Math.trunc(n * 255)

/**
 * Formats a color in the RGB colorspace.
 *
 * ```
 * import { ColorRGB } from 'radashi'
 *
 * const color = color(ColorRGB.type, 1, 0, 1, 0.5)
 *
 * ColorRGB.format(color)
 * // => 'rgba(255, 0, 255, 0.5)'
 * ```
 */
export function format(color: Color.RGB): string {
  return `rgba(${normalize(color.red)}, ${normalize(color.green)}, ${normalize(color.blue)}, ${color.alpha})`
}
