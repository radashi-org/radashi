import { type Color, ColorLAB, ColorXYZ, parseColor, toColorRGB } from 'radashi'

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

export const toLAB: typeof ColorLAB.fromRGB = ColorLAB.fromRGB

/**
 * Converts an RGB color (D65) to CIE XYZ (D50)
 *
 * @see https://image-engineering.de/library/technotes/958-how-to-convert-between-srgb-and-ciexyz
 * @source https://github.com/omgovich/colord
 */
export function toXYZ({ red, green, blue, alpha }: Color.RGB): Color.XYZ {
  // convert RGB to sRGB
  red = linearizeRgbChannel(red)
  green = linearizeRgbChannel(green)
  blue = linearizeRgbChannel(blue)

  // using sRGB own white (D65 no chromatic adaptation)
  let x = (red * 0.4124564 + green * 0.3575761 + blue * 0.1804375) * 100
  let y = (red * 0.2126729 + green * 0.7151522 + blue * 0.072175) * 100
  let z = (red * 0.0193339 + green * 0.119192 + blue * 0.9503041) * 100

  // Bradford chromatic adaptation from D65 to D50
  x = x * 1.0478112 + y * 0.0228866 + z * -0.050127
  y = x * 0.0295424 + y * 0.9904844 + z * -0.0170491
  z = x * -0.0092345 + y * 0.0150436 + z * 0.7521316

  return { type: ColorXYZ.type, x, y, z, alpha }
}

/**
 * Converts an RGB channel to its linear light (un-companded) form.
 * Linearized RGB values are widely used for color space conversions and contrast calculations
 *
 * @source https://github.com/omgovich/colord
 */
function linearizeRgbChannel(value: number): number {
  return value < 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4
}
