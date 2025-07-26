/**
 * A function that returns the value passed to it.
 *
 * @example
 * ```ts
 * identity() // => undefined
 * identity(1) // => 1
 * identity("a") // => "a"
 * ```
 */
export function identity(): undefined
export function identity<T>(value: T): T
export function identity<T>(value?: T): T | undefined {
  return value
}
