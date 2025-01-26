/**
 * Throw an error from inside an expression.
 *
 * @see https://radashi.js.org/reference/function/inlineThrow
 * @example
 * ```ts
 * const myFunc = (n: number) =>
 *   n !== 0 ? 1 / n : inlineThrow(new Error('Zero division'))
 * ```
 */
export function inlineThrow(error: Error): never {
  throw error
}
