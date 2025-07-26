import type { StrictExtract } from 'radashi'

/**
 * Literally just `Array.isArray` but with better type inference.
 *
 * @see https://radashi.js.org/reference/typed/isArray
 * @example
 * ```ts
 * isArray([]) // => true
 * isArray('hello') // => false
 * ```
 * @version 12.1.0
 */
export const isArray = /* @__PURE__ */ (() => Array.isArray)() as <Input>(
  value: Input,
) => value is ExtractArray<Input>

/**
 * An absurdly complicated but accurate type for extracting Array types.
 *
 * It's like `Extract<T, any[]>` but better with edge cases.
 */
export type ExtractArray<T> = T extends any
  ? [StrictExtract<T, readonly any[]>] extends [readonly any[]]
    ? Extract<T, readonly any[]>
    : [StrictExtract<T, any[]>] extends [any[]]
      ? Extract<T, any[]>
      : unknown[] extends T
        ? unknown[]
        : never
  : never
