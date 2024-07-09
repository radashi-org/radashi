import { clone, type Color } from 'radashi'

/**
 * Create a copy of the given `color` with its values mapped by the given `mapper`.
 *
 * ```ts
 * import { ColorHex } from 'radashi'
 *
 * const color = mapColor(ColorHex.parse('#ff0000'), (value, name, index) => 1 - value)
 * ColorHex.format(color)
 * // => '#00ffff00'
 * ```
 */
export function mapColor<T extends Color>(
  color: T,
  mapper: (value: number, name: keyof T, index: number) => number,
): T {
  const newColor = clone(color)
  color.type.components.concat('alpha').forEach((name, index) => {
    newColor[name as keyof T] = mapper(
      color[name as keyof T],
      name,
      index,
    ) as any
  })
  return newColor
}
