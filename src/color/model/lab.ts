import {
  type Color,
  ColorRGB,
  ColorXYZ,
  denormalize,
  parseColor,
  toColorLAB,
} from 'radashi'

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

/**
 * Theoretical light source that approximates "warm daylight" and
 * follows the CIE standard.
 *
 * @see https://en.wikipedia.org/wiki/Standard_illuminant
 * @source https://github.com/omgovich/colord
 */
const D50 = {
  x: 96.422,
  y: 100,
  z: 82.521,
}

/**
 * Performs RGB → CIEXYZ → LAB color conversion
 *
 * @see https://www.w3.org/TR/css-color-4/#color-conversion-code
 * @source https://github.com/omgovich/colord
 */
export function fromRGB(input: Color.RGB): Color.LAB {
  // Compute XYZ scaled relative to D50 reference white
  let { x, y, z, alpha } = ColorRGB.toXYZ(input)
  x /= D50.x
  y /= D50.y
  z /= D50.z

  // Conversion factors from https://en.wikipedia.org/wiki/CIELAB_color_space
  const e = 216 / 24389
  const k = 24389 / 27

  x = x > e ? Math.cbrt(x) : (k * x + 16) / 116
  y = y > e ? Math.cbrt(y) : (k * y + 16) / 116
  z = z > e ? Math.cbrt(z) : (k * z + 16) / 116

  return toColorLAB(116 * y - 16, 500 * (x - y), 200 * (y - z), alpha)
}

/**
 * Performs LAB → CIEXYZ → RGB color conversion
 *
 * @see https://www.w3.org/TR/css-color-4/#color-conversion-code
 * @source https://github.com/omgovich/colord
 */
export function toRGB({ lightness: l, a, b, alpha }: Color.LAB): Color.RGB {
  const y = (l + 16) / 116
  const x = a / 500 + y
  const z = y - b / 200

  // Conversion factors from https://en.wikipedia.org/wiki/CIELAB_color_space
  const e = 216 / 24389
  const k = 24389 / 27

  return ColorXYZ.toRGB({
    type: ColorXYZ.type,
    x: (x ** 3 > e ? x ** 3 : (116 * x - 16) / k) * D50.x,
    y: (l > k * e ? ((l + 16) / 116) ** 3 : l / k) * D50.y,
    z: (z ** 3 > e ? z ** 3 : (116 * z - 16) / k) * D50.z,
    alpha,
  })
}
