import type { Color } from 'radashi'
import {
  ColorHSL,
  ColorLAB,
  ColorOKLCH,
  ColorRGB,
  normalize,
  toFloat,
} from 'radashi'

type ColorValue = string | number

const isRatio = (s: ColorValue) => typeof s === 'string' && s.endsWith('%')

export function toColorRGB(
  red: ColorValue,
  green: ColorValue,
  blue: ColorValue,
  alpha?: ColorValue,
): Color.RGB {
  return color(
    ColorRGB.type,
    toFloat(red) / 255,
    toFloat(green) / 255,
    toFloat(blue) / 255,
    alpha ? +alpha : 1,
  )
}

export function toColorHSL(
  hue: ColorValue,
  saturation: ColorValue,
  lightness: ColorValue,
  alpha?: ColorValue,
): Color.HSL {
  return color(
    ColorHSL.type,
    toFloat(hue) / 360,
    toFloat(saturation) / 100,
    toFloat(lightness) / 100,
    alpha ? +alpha : 1,
  )
}

export function toColorLAB(
  lightness: ColorValue,
  a: ColorValue,
  b: ColorValue,
  alpha?: ColorValue,
): Color.LAB {
  return color(
    ColorLAB.type,
    toFloat(lightness) / 100,
    normalize(toFloat(a), isRatio(a) ? [-100, 100] : ColorLAB.abRange),
    normalize(toFloat(b), isRatio(b) ? [-100, 100] : ColorLAB.abRange),
    alpha ? +alpha : 1,
  )
}

export function toColorOKLCH(
  l: ColorValue,
  chroma: ColorValue,
  hue: ColorValue,
  alpha?: ColorValue,
): Color.OKLCH {
  return color(
    ColorOKLCH.type,
    toFloat(l) / (isRatio(l) ? 100 : 1),
    toFloat(chroma) / (isRatio(chroma) ? 100 : 0.4),
    toFloat(hue) / (isRatio(hue) ? 360 : 1),
    alpha ? +alpha : 1,
  )
}

/**
 * Create a color with the given format and components.
 *
 * ```ts
 * color(ColorHex.type, 1, 1, 1)
 * // Color { red: 1, green: 1, blue: 1, alpha: 1 }
 * ```
 */
function color<T extends Color.Type>(
  type: T,
  ...components: T['components'] extends infer U extends readonly any[]
    ? [...{ [K in keyof U]: number }, number]
    : never
): Color<T>

function color<T extends Color.Type>(type: T, ...values: number[]): Color<T> {
  const color = type.components.concat('alpha').reduce(
    (props, name, index) => {
      const value = values[index]
      props[name as keyof Color<T>] = value as any
      return props
    },
    { type } as Color<T>,
  )

  color.alpha ??= 1
  return color
}
