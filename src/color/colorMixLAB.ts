import { Color, type ColorLike, isString, lerp, parseColor } from 'radashi'

/**
 * Mixes two colors in the LAB color model. This is more perceptually
 * accurate than `colorMixCMYK` and it's the same approach used by the
 * `colord` package (from which this logic was adapted).
 *
 * @see https://en.wikipedia.org/wiki/CIELAB_color_model
 */
export function colorMixLAB(
  from: ColorLike | Color.LAB,
  to: ColorLike | Color.LAB,
  ratio: number,
): Color {
  from = isString(from)
    ? colorRgbToLab(parseColor(from))
    : 'red' in from
      ? colorRgbToLab(from)
      : from

  to = isString(to)
    ? colorRgbToLab(parseColor(to))
    : 'red' in to
      ? colorRgbToLab(to)
      : to

  return colorLabToRgb(
    lerp(from.l, to.l, ratio),
    lerp(from.a, to.a, ratio),
    lerp(from.b, to.b, ratio),
    lerp(from.alpha, to.alpha, ratio),
  )
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

/**
 * Converts an linear-light sRGB channel back to its gamma corrected form
 *
 * @source https://github.com/omgovich/colord
 */
function unlinearizeRgbChannel(ratio: number): number {
  return ratio > 0.0031308 ? 1.055 * ratio ** (1 / 2.4) - 0.055 : 12.92 * ratio
}

/**
 * Converts an CIE XYZ color (D50) to RGBA color space (D65)
 *
 * @see https://www.w3.org/TR/css-color-4/#color-conversion-code
 * @source https://github.com/omgovich/colord
 */
function colorXyzToRgb(x: number, y: number, z: number, alpha: number): Color {
  // Bradford chromatic adaptation from D50 to D65
  x = x * 0.9555766 + y * -0.0230393 + z * 0.0631636
  y = x * -0.0282895 + y * 1.0099416 + z * 0.0210077
  z = x * 0.0122982 + y * -0.020483 + z * 1.3299098

  return new Color(
    unlinearizeRgbChannel(0.032404542 * x - 0.015371385 * y - 0.004985314 * z),
    unlinearizeRgbChannel(-0.00969266 * x + 0.018760108 * y + 0.00041556 * z),
    unlinearizeRgbChannel(0.000556434 * x - 0.002040259 * y + 0.010572252 * z),
    alpha,
  )
}

/**
 * Converts an RGB color (D65) to CIE XYZ (D50)
 *
 * @see https://image-engineering.de/library/technotes/958-how-to-convert-between-srgb-and-ciexyz
 * @source https://github.com/omgovich/colord
 */
function colorRgbToXyz({ red, green, blue, alpha }: Color): Color.XYZ {
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

  return { x, y, z, alpha }
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
function colorRgbToLab(input: Color): Color.LAB {
  // Compute XYZ scaled relative to D50 reference white
  let { x, y, z, alpha } = colorRgbToXyz(input)
  x /= D50.x
  y /= D50.y
  z /= D50.z

  // Conversion factors from https://en.wikipedia.org/wiki/CIELAB_color_space
  const e = 216 / 24389
  const k = 24389 / 27

  x = x > e ? Math.cbrt(x) : (k * x + 16) / 116
  y = y > e ? Math.cbrt(y) : (k * y + 16) / 116
  z = z > e ? Math.cbrt(z) : (k * z + 16) / 116

  return {
    l: 116 * y - 16,
    a: 500 * (x - y),
    b: 200 * (y - z),
    alpha,
  }
}

/**
 * Performs LAB → CIEXYZ → RGB color conversion
 *
 * @see https://www.w3.org/TR/css-color-4/#color-conversion-code
 * @source https://github.com/omgovich/colord
 */
function colorLabToRgb(l: number, a: number, b: number, alpha: number): Color {
  const y = (l + 16) / 116
  const x = a / 500 + y
  const z = y - b / 200

  // Conversion factors from https://en.wikipedia.org/wiki/CIELAB_color_space
  const e = 216 / 24389
  const k = 24389 / 27

  return colorXyzToRgb(
    (x ** 3 > e ? x ** 3 : (116 * x - 16) / k) * D50.x,
    (l > k * e ? ((l + 16) / 116) ** 3 : l / k) * D50.y,
    (z ** 3 > e ? z ** 3 : (116 * z - 16) / k) * D50.z,
    alpha,
  )
}
