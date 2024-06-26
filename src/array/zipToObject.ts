import { isArray, isFunction } from 'radashi'

/**
 * Creates an object mapping the specified keys to their corresponding
 * values
 *
 * @example
 * const zipped = zipToObject(['a', 'b'], [1, 2])
 * // { a: 1, b: 2 }
 *
 * const zipped = zipToObject(['a', 'b'], (k, i) => k + i)
 * // { a: 'a0', b: 'b1' }
 *
 * const zipped = zipToObject(['a', 'b'], 1)
 * // { a: 1, b: 1 }
 */
export function zipToObject<K extends string | number | symbol, V>(
  keys: K[],
  values: V | ((key: K, idx: number) => V) | V[]
): Record<K, V> {
  if (!keys || !keys.length) {
    return {} as Record<K, V>
  }

  const getValue = isFunction(values)
    ? values
    : isArray(values)
    ? (_k: K, i: number) => values[i]
    : (_k: K, _i: number) => values

  return keys.reduce((acc, key, idx) => {
    acc[key] = getValue(key, idx)
    return acc
  }, {} as Record<K, V>)
}
