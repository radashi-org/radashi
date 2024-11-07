import { isArray, isFunction } from 'radashi'

/**
 * Creates an object mapping the specified keys to their corresponding
 * values.
 *
 * @see https://radashi.js.org/reference/array/zipToObject
 * @example
 * ```ts
 * zipToObject(['a', 'b'], [1, 2])
 * // { a: 1, b: 2 }
 *
 * zipToObject(['a', 'b'], (k, i) => k + i)
 * // { a: 'a0', b: 'b1' }
 *
 * zipToObject(['a', 'b'], 1)
 * // { a: 1, b: 1 }
 * ```
 * @version 12.1.0
 */
export function zipToObject<K extends string | number | symbol, V>(
  keys: readonly K[],
  values: V | ((key: K, idx: number) => V) | readonly V[],
): Record<K, V> {
  if (!keys || !keys.length) {
    return {} as Record<K, V>
  }

  const getValue = isFunction(values)
    ? values
    : isArray(values)
      ? (_k: K, i: number) => values[i]
      : (_k: K, _i: number) => values

  return keys.reduce(
    (acc, key, idx) => {
      acc[key] = getValue(key, idx)
      return acc
    },
    {} as Record<K, V>,
  )
}
