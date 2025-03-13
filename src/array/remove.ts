/**
 * Removes elements from an array based on the specified predicate
 * function.
 *
 * @see https://radashi.js.org/reference/array/remove
 * @example
 * ```ts
 * // Example 1: Remove even numbers from an array
 * const numbers = [1, 2, 3, 4, 5];
 * const result = remove(numbers, value => value % 2 === 0);
 * console.log(result); // Output: [1, 3, 5]
 *
 * // Example 2: Remove objects with a specific property value
 * const items = [
 *   { id: 1, active: true },
 *   { id: 2, active: false },
 *   { id: 3, active: true }
 * ];
 * const result = remove(items, item => item.active);
 * console.log(result); // Output: [{ id: 2, active: false }]
 * ```
 */
export function remove<T>(
  array: readonly T[],
  predicate: (value: T) => boolean,
): T[] {
  return array.filter(item => !predicate(item))
}
