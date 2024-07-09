import type { Color } from 'radashi'
import { mapColor } from './mapColor'

export function colorMix<T extends Color.Type>(
  color1: Color<T>,
  color2: Color<T>,
  ratio: number,
): Color<T> {
  if (ratio <= 0) {
    return color1
  }
  if (ratio >= 1) {
    return color2
  }
  return mapColor(color1, (value, name) => {
    return value * (1 - ratio) + color2[name] * ratio
  })
}
