// Whenever Symbol.asyncIterator is missing, use the same symbol that
// polyfills do (e.g. @azure/core-asynciterator-polyfill).
const asyncIteratorSymbol: symbol =
  (Symbol as any).asyncIterator || Symbol.for('Symbol.asyncIterator')

// @ts-ignore: Assume "lib.es2018.asynciterable" is included.
type AsyncIterable = globalThis.AsyncIterable<unknown>

/**
 * Checks if a value is an async iterable.
 *
 * @example
 * ```ts
 * isAsyncIterable((async function* () { yield 1 })())
 * // => true
 *
 * isAsyncIterable([1, 2, 3])
 * // => false
 * ```
 */
export function isAsyncIterable(value: unknown): value is AsyncIterable {
  return (
    !!value &&
    typeof value === 'object' &&
    typeof value[asyncIteratorSymbol as never] === 'function'
  )
}
