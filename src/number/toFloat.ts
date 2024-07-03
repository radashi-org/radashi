import { isSymbol } from 'radashi'

export function toFloat(value: unknown): number

export function toFloat(value: unknown, defaultValue: number): number

export function toFloat<T>(
  value: unknown,
  defaultValue: T,
): number | Exclude<T, undefined>

export function toFloat<T>(
  value: any,
  defaultValue?: T,
): number | Exclude<T, undefined> {
  // Symbols throw on string coercion, which parseFloat does.
  const parsedValue = isSymbol(value) ? Number.NaN : Number.parseFloat(value)
  return Number.isNaN(parsedValue)
    ? defaultValue !== undefined
      ? (defaultValue as Exclude<T, undefined>)
      : 0
    : parsedValue
}
