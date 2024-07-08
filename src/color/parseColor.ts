import { Color } from 'radashi'

const hexColorRegex = /^#?([\da-f]{3,4}|[\da-f]{6}|[\da-f]{8})$/i
const rgbColorRegex = /^(rgba?)\((.*?),(.*?),(.*?)(?:,(.*?))?\)$/

/**
 * Parses a color string to an RGB color object.
 *
 * Supports hex, RGB, and RGBA color strings. Hex strings can have 3,
 * 4, 6, or 8 digits. RGB and RGBA strings should have 0-255 RGB
 * values and 0-1 alpha values.
 *
 * Unless you provide a default value, this function will throw when
 * given an invalid or unsupported color string.
 *
 * ```ts
 * parseColor('#fff')
 * // => { red: 1, green: 1, blue: 1, alpha: 1 }
 *
 * parseColor('rgb(0,0,0)')
 * // => { red: 0, green: 0, blue: 0, alpha: 1 }
 *
 * parseColor('rgba(255, 255, 255, 0.5)')
 * // => { red: 1, green: 1, blue: 1, alpha: 0.5 }
 * ```
 */
export function parseColor(input: string): Color
export function parseColor<T>(input: string, defaultValue: T): Color | T
export function parseColor(input: string, defaultValue?: any): Color | any {
  const hex = hexColorRegex.exec(input)
  if (hex) {
    const [, match] = hex

    // Compute slice factor based on whether it's a 3/4 or 6/8 digit hex.
    const f = match.length < 6 ? 1 : 2

    // Extract bytes from matching slice.
    let red = Number.parseInt(match.slice(0 * f, 1 * f), 16)
    let green = Number.parseInt(match.slice(1 * f, 2 * f), 16)
    let blue = Number.parseInt(match.slice(2 * f, 3 * f), 16)
    const alpha = Number.parseInt(match.slice(3 * f, 4 * f) || 'ff', 16)

    // If it's a 3/4 digit hex, copy the bytes to the left.
    if (f === 1) {
      red = red | (red << 4)
      green = green | (green << 4)
      blue = blue | (blue << 4)
    }

    return new Color(red / 255, green / 255, blue / 255, alpha / 255)
  }

  const rgba = rgbColorRegex.exec(input)
  if (rgba) {
    const [, fn, red, green, blue, alpha] = rgba
    return new Color(
      +red / 255,
      +green / 255,
      +blue / 255,
      fn === 'rgba' ? +alpha : 1,
    )
  }

  if (defaultValue !== undefined) {
    return defaultValue
  }
  throw new Error('Invalid color string: ' + input)
}
