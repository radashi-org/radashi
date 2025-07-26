/**
 * Asserts that a condition is true. If the condition is false, an
 * error is thrown. This function uses TypeScript's `asserts` keyword
 * to narrow the type of the value being asserted.
 *
 * @see https://radashi.js.org/reference/typed/assert
 * @example
 * ```ts
 * function processValue(value: string | null) {
 *   assert(value, 'Value cannot be null or an empty string')
 *   // value is now narrowed to string
 *   console.log(value.toUpperCase())
 * }
 *
 * processValue('hello') // logs "HELLO"
 * processValue(null) // throws Error: Value cannot be null or an empty string
 * processValue('') // throws Error: Value cannot be null or an empty string
 * ```
 * @example
 * ```ts
 * // Example with false literal, return type is never
 * const result =
 *   status === 'success'
 *     ? 1
 *     : status === 'pending'
 *       ? 2
 *       : assert(false, 'Unexpected status')
 *
 * typeof result
 * //     ^? 1 | 2
 * ```
 * @version 12.6.0
 */
export function assert(condition: false, error?: string | Error): never
export function assert(
  condition: unknown,
  error?: string | Error,
): asserts condition
export function assert(
  condition: unknown,
  message?: string | Error,
): asserts condition {
  if (!condition) {
    throw message instanceof Error
      ? message
      : new Error(message ?? 'Assertion failed')
  }
}
