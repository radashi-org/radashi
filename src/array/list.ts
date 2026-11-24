import { isFunction } from 'radashi'

/**
 * Creates a list of given start, end, value, and step parameters.
 * For nonempty ranges, zero and negative steps throw a RangeError.
 *
 * @see https://radashi.js.org/reference/array/list
 * @example
 * ```ts
 * list(3)                  // 0, 1, 2, 3
 * list(0, 3)               // 0, 1, 2, 3
 * list(0, 3, 'y')          // y, y, y, y
 * list(0, 3, () => 'y')    // y, y, y, y
 * list(0, 3, i => i)       // 0, 1, 2, 3
 * list(0, 3, i => `y${i}`) // y0, y1, y2, y3
 * list(0, 3, obj)          // obj, obj, obj, obj
 * list(0, 6, i => i, 2)    // 0, 2, 4, 6
 * ```
 * @version 12.1.0
 */
export function list<T = number>(
  startOrLength: number,
  end?: number,
  valueOrMapper: T | ((i: number) => T) = i => i as T,
  step = 1,
): T[] {
  const mapper = isFunction(valueOrMapper) ? valueOrMapper : () => valueOrMapper
  const start = end !== undefined ? startOrLength : 0
  const final = end ?? startOrLength
  if (start <= final && step <= 0) {
    throw new RangeError('Range step must be greater than zero')
  }
  const result: T[] = []
  for (let i = start; i <= final; i += step) {
    result.push(mapper(i))
  }
  return result
}
