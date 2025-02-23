/**
 * Return true if the give value is bigint.
 *
 * @see https://radashi.js.org/reference/typed/isBigInt
 * @example
 * ```ts
 * isBigInt('hello') // => false
 * isBigInt(['hello']) // => false
 * isBigInt(12) // => false
 * isBigInt(0n) // => true
 * ```
 */
export function isBigInt(value: unknown): value is bigint {
  return typeof value === 'bigint'
}
