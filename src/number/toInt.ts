import { isSymbol } from 'radashi'

export function toInt(value: unknown): number

export function toInt(value: unknown, defaultValue: number): number

export function toInt<T>(
  value: unknown,
  defaultValue: T,
): number | Exclude<T, undefined>

export function toInt<T>(
  value: any,
  defaultValue?: T,
): number | Exclude<T, undefined> {
  // Symbols throw on string coercion, which parseInt does.
  const parsedValue = isSymbol(value) ? Number.NaN : Number.parseInt(value)
  return Number.isNaN(parsedValue)
    ? defaultValue !== undefined
      ? (defaultValue as Exclude<T, undefined>)
      : 0
    : parsedValue
}
