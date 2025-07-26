import { list, range } from 'radashi'

export interface Series<T> {
  min: (a: T, b: T) => T
  max: (a: T, b: T) => T
  first: () => T
  last: () => T
  next: (current: T, defaultValue?: T) => T
  previous: (current: T, defaultValue?: T) => T
  spin: (current: T, num: number) => T
}

/**
 * Creates a series object around a list of values that should be
 * treated with order.
 *
 * @see https://radashi.js.org/reference/series/series
 * @example
 * ```ts
 * const numbers = series([1, 2, 3])
 *
 * numbers.first() // => 1
 * numbers.last() // => 3
 * numbers.next(2) // => 3
 * numbers.previous(2) // => 1
 * numbers.spin(2, 1) // => 3
 * numbers.spin(2, -1) // => 1
 * ```
 * @version 12.1.0
 */
export const series = <T>(
  items: readonly T[],
  toKey: (item: T) => string | symbol = item => `${item}`,
): Series<T> => {
  const indexesByKey: Record<string | symbol, number> = {}
  const itemsByIndex: Record<number, T> = {}

  for (const idx of range(items.length - 1)) {
    const item = items[idx]
    indexesByKey[toKey(item)] = idx
    itemsByIndex[idx] = item
  }

  /**
   * Returns the first item from the series.
   */
  const first = (): T => itemsByIndex[0]

  /**
   * Returns the last item in the series.
   */
  const last = (): T => itemsByIndex[items.length - 1]

  /**
   * Given an item in the series, returns the next item in the series
   * or `defaultValue` if the given value is the last item in the series.
   */
  const next = (current: T, defaultValue?: T): T =>
    itemsByIndex[indexesByKey[toKey(current)] + 1] ?? defaultValue ?? first()

  /**
   * Given an item in the series, returns the previous item in the
   * series or `defaultValue` if the given value is the first item in
   * the series.
   */
  const previous = (current: T, defaultValue?: T): T =>
    itemsByIndex[indexesByKey[toKey(current)] - 1] ?? defaultValue ?? last()

  return {
    /**
     * Given two values in the series, returns the value that occurs
     * earlier in the series.
     */
    min(a, b) {
      return indexesByKey[toKey(a)] < indexesByKey[toKey(b)] ? a : b
    },
    /**
     * Given two values in the series, returns the value that occurs
     * later in the series.
     */
    max(a, b) {
      return indexesByKey[toKey(a)] > indexesByKey[toKey(b)] ? a : b
    },
    first,
    last,
    next,
    previous,
    /**
     * A more dynamic method than `next` and `previous` that lets you move
     * many times in either direction.
     *
     * ```ts
     * series(weekdays).spin('wednesday', 3) // => 'monday'
     * series(weekdays).spin('wednesday', -3) // => 'friday'
     * ```
     */
    spin(current, num) {
      if (num === 0) {
        return current
      }
      const abs = Math.abs(num)
      const rel = abs > items.length ? abs % items.length : abs
      return list(0, rel - 1).reduce(
        acc => (num > 0 ? next(acc) : previous(acc)),
        current,
      )
    },
  }
}
