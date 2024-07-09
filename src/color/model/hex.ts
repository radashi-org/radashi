import { type Color, color, ColorRGB, parseColor } from 'radashi'

export type { Type } from './rgb.ts'

export const type: typeof ColorRGB.type = ColorRGB.type

export const parser: Color.Parser<typeof type, RegExpExecArray> = {
  model: type,
  regex: /^#?([\da-f]{3,4}|[\da-f]{6}|[\da-f]{8})$/i,
  parse(match) {
    const [, hex] = match

    // Compute slice factor based on whether it's a 3/4 or 6/8 digit hex.
    const f = hex.length < 6 ? 1 : 2

    // Extract bytes from matching slice.
    let red = Number.parseInt(hex.slice(0 * f, 1 * f), 16)
    let green = Number.parseInt(hex.slice(1 * f, 2 * f), 16)
    let blue = Number.parseInt(hex.slice(2 * f, 3 * f), 16)
    const alpha = Number.parseInt(hex.slice(3 * f, 4 * f) || 'ff', 16)

    // If it's a 3/4 digit hex, copy the bytes to the left.
    if (f === 1) {
      red = red | (red << 4)
      green = green | (green << 4)
      blue = blue | (blue << 4)
    }

    return color(type, red / 255, green / 255, blue / 255, alpha / 255)
  },
}

export function parse<TDefault = never>(
  input: string,
  defaultValue?: TDefault,
): Color.Hex | TDefault {
  return parseColor(input, [parser], defaultValue)
}

const normalize = (n: number) => n.toString(16).padStart(2, '0')

export function format(color: Color.Hex): string {
  return `#${normalize(color.red)}${normalize(color.green)}${normalize(color.blue)}${normalize(color.alpha)}`
}
