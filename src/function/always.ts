/**
 * Create a function that always returns the same value.
 *
 * @example
 * ```ts
 * const alwaysTrue = always(true)
 * alwaysTrue() // true
 * alwaysTrue() // true
 * alwaysTrue() // true
 * ```
 * @version 12.2.0
 */
export function always<T>(value: T): () => T {
  return () => value
}
