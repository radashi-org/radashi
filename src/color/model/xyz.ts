import { type Color, toColorRGB } from 'radashi'

const components = ['x', 'y', 'z'] as const

interface XYZ extends Color.Type<typeof components> {}
export type { XYZ as Type }

export const type: XYZ = {
  name: 'xyz',
  components,
}

/**
 * Converts an CIE XYZ color (D50) to RGBA color space (D65)
 *
 * @see https://www.w3.org/TR/css-color-4/#color-conversion-code
 * @source https://github.com/omgovich/colord
 */
export function toRGB({ x, y, z, alpha }: Color.XYZ): Color.RGB {
  // Bradford chromatic adaptation from D50 to D65
  x = x * 0.9555766 + y * -0.0230393 + z * 0.0631636
  y = x * -0.0282895 + y * 1.0099416 + z * 0.0210077
  z = x * 0.0122982 + y * -0.020483 + z * 1.3299098

  return toColorRGB(
    unlinearizeRgbChannel(0.032404542 * x - 0.015371385 * y - 0.004985314 * z),
    unlinearizeRgbChannel(-0.00969266 * x + 0.018760108 * y + 0.00041556 * z),
    unlinearizeRgbChannel(0.000556434 * x - 0.002040259 * y + 0.010572252 * z),
    alpha,
  )
}

/**
 * Converts an linear-light sRGB channel back to its gamma corrected form
 *
 * @source https://github.com/omgovich/colord
 */
function unlinearizeRgbChannel(ratio: number): number {
  return ratio > 0.0031308 ? 1.055 * ratio ** (1 / 2.4) - 0.055 : 12.92 * ratio
}
