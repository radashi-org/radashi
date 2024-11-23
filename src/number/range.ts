import { isFunction } from 'radashi'

/**
 * Creates a generator that will produce an iteration through the
 * range of number as requested.
 *
 * @see https://radashi.js.org/reference/array/range
 * @example
 * ```ts
 * range(3)                  // yields 0, 1, 2, 3
 * range(0, 3)               // yields 0, 1, 2, 3
 * range(0, 3, 'y')          // yields y, y, y, y
 * range(0, 3, () => 'y')    // yields y, y, y, y
 * range(0, 3, i => i)       // yields 0, 1, 2, 3
 * range(0, 3, i => `y${i}`) // yields y0, y1, y2, y3
 * range(0, 3, obj)          // yields obj, obj, obj, obj
 * range(0, 6, i => i, 2)    // yields 0, 2, 4, 6
 * ```
 * @version 12.1.0
 */
export function* range<T = number>(
  startOrLength: number,
  end?: number,
  valueOrMapper: T | ((i: number) => T) = i => i as T,
  step = 1,
): Generator<T> {
  const mapper = isFunction(valueOrMapper) ? valueOrMapper : () => valueOrMapper
  const start = end ? startOrLength : 0
  const final = end ?? startOrLength
  for (let i = start; i <= final; i += step) {
    yield mapper(i)
    if (i + step > final) {
      break
    }
  }
}
