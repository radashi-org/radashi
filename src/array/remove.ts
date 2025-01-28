/**
 * Removes elements from an array based on the specified predicate function.
 *
 * @template T - The type of elements in the array.
 * @param {readonly T[]} array - The original array to filter.
 * @param {(value: T) => boolean} predicate - A function that determines whether an element should be removed.
 *        If the function returns true for an element, it will be excluded from the resulting array.
 * @returns {T[]} A new array containing elements that do not satisfy the predicate function.
 *
 * @example
 * // Example 1: Remove even numbers from an array
 * const numbers = [1, 2, 3, 4, 5];
 * const result = remove(numbers, value => value % 2 === 0);
 * console.log(result); // Output: [1, 3, 5]
 *
 * @example
 * // Example 2: Remove objects with a specific property value
 * const items = [
 *   { id: 1, active: true },
 *   { id: 2, active: false },
 *   { id: 3, active: true }
 * ];
 * const result = remove(items, item => item.active);
 * console.log(result); // Output: [{ id: 2, active: false }]
 */
export function remove<T>(
  array: readonly T[],
  predicate: (value: T) => boolean
): T[] {
  return array.filter((item) => !predicate(item));
}
