/**
 * Categorizes elements from an `array` into distinct groups. The
 * function returns an object where each key is a category identifier
 * determined by the `getGroupId` function, and each value is an array
 * containing all elements that belong to that category.
 *
 * @see https://radashi.js.org/reference/array/group
 * @example
 * ```ts
 * group([1, 2, 3, 4], (n) => n % 2 === 0 ? 'even' : 'odd')
 * // { even: [2, 4], odd: [1, 3] }
 * ```
 * @version 12.1.0
 */
export function group<T, Key extends string | number | symbol>(
  array: readonly T[],
  getGroupId: (item: T, index: number) => Key,
): { [K in Key]?: T[] } {
  const groups = {} as Record<Key, T[]>
  array.forEach((item, index) => {
    const groupId = getGroupId(item, index)
    if (!Object.prototype.hasOwnProperty.call(groups, groupId)) {
      groups[groupId] = []
    }
    groups[groupId].push(item)
  })
  return groups
}
