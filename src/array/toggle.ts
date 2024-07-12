/**
 * If the item matching the condition already exists in the list it
 * will be removed. If it does not it will be added.
 *
 * @see https://radashi-org.github.io/reference/array/toggle
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
 */
export function toggle<T>(
  array: readonly T[],
  item: T,
  /**
   * Converts an item of type T item into a value that can be checked
   * for equality
   */
  toKey?: null | ((item: T, idx: number) => number | string | symbol),
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

  const matcher = toKey
    ? (x: T, idx: number) => toKey(x, idx) === toKey(item, idx)
    : (x: T) => x === item

  const existing = array.find(matcher)

  if (existing !== undefined) {
    return array.filter((x, idx) => !matcher(x, idx))
  }

  return options?.strategy === 'prepend' ? [item, ...array] : [...array, item]
}
