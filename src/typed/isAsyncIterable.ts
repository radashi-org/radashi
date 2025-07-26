// Whenever Symbol.asyncIterator is missing, use the same symbol that
// polyfills do (e.g. @azure/core-asynciterator-polyfill).
const asyncIteratorSymbol: symbol =
  /* c8 ignore next */ (Symbol as any).asyncIterator ||
  /* @__PURE__ */ Symbol.for('Symbol.asyncIterator')

// @ts-ignore: Assume "lib.es2018.asynciterable" is included.
type AsyncIterable = globalThis.AsyncIterable<unknown>

/**
 * Checks if a value is an async iterable.
 *
 * @see https://radashi.js.org/reference/typed/isAsyncIterable
 * @example
 * ```ts
 * isAsyncIterable((async function* () { yield 1 })())
 * // => true
 *
 * isAsyncIterable([1, 2, 3])
 * // => false
 * ```
 * @version 12.4.0
 */
export function isAsyncIterable(value: unknown): value is AsyncIterable {
  return (
    !!value &&
    typeof value === 'object' &&
    typeof value[asyncIteratorSymbol as never] === 'function'
  )
}
