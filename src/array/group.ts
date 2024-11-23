/**
 * Sorts an `array` of items into groups. The return value is a map
 * where the keys are the group IDs the given `getGroupId` function
 * produced and the value is an array of each item in that group.
 *
 * @see https://radashi.js.org/reference/array/group
 * @example
 * ```ts
 * group([1, 2, 3, 4], (n) => n % 2 === 0 ? 'even' : 'odd')
 * // { even: [2], odd: [1, 3, 4] }
 * ```
 * @version 12.1.0
 */
export function group<T, Key extends string | number | symbol>(
  array: readonly T[],
  getGroupId: (item: T) => Key,
): { [K in Key]?: T[] } {
  return array.reduce(
    (acc, item) => {
      const groupId = getGroupId(item)
      if (!acc[groupId]) {
        acc[groupId] = []
      }
      acc[groupId].push(item)
      return acc
    },
    {} as Record<Key, T[]>,
  )
}
