import { unique } from '../array'
import { mapValues } from '../object'

export const FLUENT = true

declare global {
  interface Object {
    mapValues<TValue, TKey extends string | number | symbol, TNewValue>(
      mapFunc: (value: TValue, key: TKey) => TNewValue
    ): Record<TKey, TNewValue>
  }

  interface Array<T> {
    unique<K extends string | number | symbol = string>(
      this: T[],
      toKey?: (item: T) => K
    ): T[]
  }
}

Object.prototype.mapValues = function <
  TValue,
  TKey extends string | number | symbol,
  TNewValue
>(
  this: Record<TKey, TValue>,
  mapFunc: (value: TValue, key: TKey) => TNewValue
): Record<TKey, TNewValue> {
  return mapValues(this, mapFunc)
}

Array.prototype.unique = function <
  T,
  K extends string | number | symbol = string
>(toKey?: (this: T[], item: T) => K): T[] {
  return unique(this, toKey)
}
