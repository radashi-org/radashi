/**
 * Executes a provided function with the given value and returns the original value.
 * If the callback modifies the value using a mutating method (e.g., `push`, `splice` for arrays),
 * those changes will persist. Otherwise, the original value remains unchanged.
 * This is useful for performing side effects within method chains.
 *
 * @template T - The type of the value.
 * @param {T} value - The value to be passed to the provided function.
 * @param {(value: T) => void} fn - A function that receives the value and applies side effects or performs mutations.
 * @returns {T} The original value. If `T` is an object or array and the callback modifies it using a mutating method, the changes will persist.
 *
 * @example
 * // Example 1: Logging a value within a method chain
 * const result = tap({ a: 1 }, value => console.log(value)); // Output: { a: 1 }
 * console.log(result); // Output: { a: 1 }
 *
 * @example
 * // Example 2: Modifying an object inside the callback
 * const result = tap({ count: 0 }, value => value.count += 1);
 * console.log(result); // Output: { count: 1 }
 *
 * @example
 * // Example 3: Modifying an array inside the callback
 * const result = tap([1, 2, 3], value => value.push(4));
 * console.log(result); // Output: [1, 2, 3, 4]
 */
export function tap<T>(value: T, fn: (value: T) => void): T {
  fn(value)
  return value
}
