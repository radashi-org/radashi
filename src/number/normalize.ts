import { isArray } from 'radashi'

export function normalize(
  value: number,
  range: readonly [number, number] | number,
): number {
  const [min, max] = isArray(range) ? range : [0, range]
  return (value - min) / (max - min)
}

export function denormalize(
  value: number,
  range: readonly [number, number] | number,
): number {
  const [min, max] = isArray(range) ? range : [0, range]
  return value * (max - min) + min
}
