/**
 * Return true if the given value is a function.
 *
 * @see https://radashi-org.github.io/reference/typed/isFunction
 * @example
 * ```ts
 * isFunction(0) // => false
 * isFunction(() => {}) // => true
 * isFunction(function() {}) // => true
 * isFunction(async function() {}) // => true
 * isFunction(class {}) // => false
 * ```
 */
// biome-ignore lint/complexity/noBannedTypes:
export function isFunction(value: any): value is Function {
  return typeof value === 'function'
}
