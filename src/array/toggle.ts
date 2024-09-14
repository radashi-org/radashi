/**
 * Either adds or removes an item from an array, based on whether it
 * already exists in the array. If multiple items match the given
 * `item`, all matching items will be removed.
 *
 * Note that the given `array` is *not mutated*. A copy of the array
 * is returned with the given item either added or removed.
 *
 * - **"toKey" parameter**
 *   - You may define a `toKey` callback, which is a function that
 *   converts an item into a value that can be checked for equality.
 *   When called with the given `item`, an index of -1 will be passed.
 *
 * - **"strategy" option**
 *   - You may define a `strategy` option, which determines where the
 *   item should be added in the array.
 *
 * @see https://radashi.js.org/reference/array/toggle
 * @example
 * ```ts
 * toggle([1, 2, 3], 4) // => [1, 2, 3, 4]
 * toggle([1, 2, 3], 2) // => [1, 3]
 *
 * toggle(
 *   [
 *     { id: 1 },
 *     { id: 2 },
 *   ],
 *   { id: 3 },
 *   (obj) => obj.id,
 *   { strategy: 'prepend' }
 * )
 * // => [{ id: 3 }, { id: 1 }, { id: 2 }]
 * ```
 * @version 12.1.0
 */
export function toggle<T>(
  array: readonly T[],
  item: T,
  toKey?: ((item: T, idx: number) => number | string | symbol) | null,
  options?: {
    strategy?: 'prepend' | 'append'
  },
): T[] {
  if (!array) {
    return item !== undefined ? [item] : []
  }
  if (item === undefined) {
    return [...array]
  }

  let matcher: (item: T, idx: number) => boolean

  if (toKey) {
    const key = toKey(item, -1)

    matcher = (x: T, idx: number) => toKey(x, idx) === key
  } else {
    matcher = (x: T) => x === item
  }

  const existing = array.find(matcher)

  if (existing !== undefined) {
    return array.filter((x, idx) => !matcher(x, idx))
  }

  return options?.strategy === 'prepend' ? [item, ...array] : [...array, item]
}
