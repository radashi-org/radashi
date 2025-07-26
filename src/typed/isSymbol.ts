/**
 * Checks if the given value is a symbol.
 *
 * @see https://radashi.js.org/reference/typed/isSymbol
 * @example
 * ```ts
 * isSymbol(Symbol('abc')) // => true
 * isSymbol('abc') // => false
 * ```
 * @version 12.1.0
 */
export function isSymbol(value: unknown): value is symbol {
  return typeof value === 'symbol'
}
