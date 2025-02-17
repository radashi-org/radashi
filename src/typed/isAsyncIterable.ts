/**
 * Checks if a value is an async iterable.
 *
 * @example
 * ```ts
 * isAsyncIterable(async function* () { yield 1 })
 * // => true
 *
 * isAsyncIterable([1, 2, 3])
 * // => false
 * ```
 *
 * @param value The value to check.
 * @returns `true` if the value is an async iterable, `false` otherwise.
 */
export function isAsyncIterable(value: unknown): // @ts-ignore
value is globalThis.AsyncIterable<unknown> {
  return (
    !!value &&
    typeof value === 'object' &&
    // @ts-ignore
    Symbol.asyncIterator in value
  )
}
