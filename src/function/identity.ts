/**
 * A function that returns the value passed to it.
 *
 * @see https://radashi.js.org/reference/function/identity
 * @example
 * ```ts
 * identity() // => undefined
 * identity(1) // => 1
 * identity("a") // => "a"
 * ```
 * @version 12.7.0
 */
export function identity(): undefined
export function identity<T>(value: T): T
export function identity<T>(value?: T): T | undefined {
  return value
}
