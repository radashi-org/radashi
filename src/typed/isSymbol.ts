/**
 * Checks if the given value is a symbol.
 *
 * @see https://radashi-org.github.io/reference/typed/isSymbol
 * @example
 * ```ts
 * isSymbol(Symbol('abc')) // => true
 * isSymbol('abc') // => false
 * ```
 */
export function isSymbol(value: unknown): value is symbol {
  return typeof value === 'symbol'
}
