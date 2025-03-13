/**
 * Return true if the give value is a BigInt.
 *
 * @see https://radashi.js.org/reference/typed/isBigInt
 * @example
 * ```ts
 * _.isBigInt(0n) // => true
 * _.isBigInt(BigInt(0)) // => true
 * _.isBigInt(12) // => false
 * _.isBigInt('0n') // => false
 * ```
 * @version 12.4.0
 */
export function isBigInt(value: unknown): value is bigint {
  return typeof value === 'bigint'
}
