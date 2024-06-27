import { list, range } from 'radashi'

/**
 * Creates a series object around a list of values that should be
 * treated with order.
 */
export const series = <T>(
  items: readonly T[],
  toKey: (item: T) => string | symbol = item => `${item}`
) => {
  const indexesByKey: Record<string | symbol, number> = {}
  const itemsByIndex: Record<number, T> = {}

  for (const idx of range(items.length - 1)) {
    const item = items[idx]
    indexesByKey[toKey(item)] = idx
    itemsByIndex[idx] = item
  }

  /**
   * Given two values in the series, returns the value that occurs
   * earlier in the series.
   */
  const min = (a: T, b: T): T => {
    return indexesByKey[toKey(a)] < indexesByKey[toKey(b)] ? a : b
  }
  /**
   * Given two values in the series, returns the value that occurs
   * later in the series.
   */
  const max = (a: T, b: T): T => {
    return indexesByKey[toKey(a)] > indexesByKey[toKey(b)] ? a : b
  }
  /**
   * Returns the first item from the series.
   */
  const first = (): T => {
    return itemsByIndex[0]
  }
  /**
   * Returns the last item in the series.
   */
  const last = (): T => {
    return itemsByIndex[items.length - 1]
  }
  /**
   * Given an item in the series, returns the next item in the series
   * or `defaultValue` if the given value is the last item in the series.
   */
  const next = (current: T, defaultValue?: T): T => {
    return (
      itemsByIndex[indexesByKey[toKey(current)] + 1] ?? defaultValue ?? first()
    )
  }
  /**
   * Given an item in the series, returns the previous item in the
   * series or `defaultValue` if the given value is the first item in
   * the series.
   */
  const previous = (current: T, defaultValue?: T): T => {
    return (
      itemsByIndex[indexesByKey[toKey(current)] - 1] ?? defaultValue ?? last()
    )
  }
  /**
   * A more dynamic method than `next` and `previous` that lets you move
   * many times in either direction.
   *
   * ```ts
   * series(weekdays).spin('wednesday', 3) // => 'monday'
   * series(weekdays).spin('wednesday', -3) // => 'friday'
   * ```
   */
  const spin = (current: T, num: number): T => {
    if (num === 0) return current
    const abs = Math.abs(num)
    const rel = abs > items.length ? abs % items.length : abs
    return list(0, rel - 1).reduce(
      acc => (num > 0 ? next(acc) : previous(acc)),
      current
    )
  }
  return {
    min,
    max,
    first,
    last,
    next,
    previous,
    spin
  }
}
