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
 */
export function always<T>(value: T): () => T {
  return () => value
}
