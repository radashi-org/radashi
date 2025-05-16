export type Concat<T extends readonly any[]> = T[number] extends infer TElement
  ? (TElement extends readonly (infer TNestedElement)[]
      ? Exclude<TNestedElement, undefined | null>
      : Exclude<TElement, undefined | null>)[]
  : unknown[]

/**
 * Flattens and filters nullish values from arguments, returning a new
 * array containing only the non-nullish elements. Nested arrays are
 * flattened one level deep.
 *
 * @see https://radashi.js.org/reference/array/concat
 * @example
 * ```ts
 * const result = _.concat('', ['a'], undefined, [null, 'b'])
 * // => ['', 'a', 'b']
 * ```
 * @example
 * ```ts
 * const result = _.concat(1, [2, [3]], null)
 * // => [1, 2, [3]] // Note: only flattens one level
 * ```
 * @version 12.5.0
 */
export function concat<T extends readonly [any, any, ...any[]]>(
  ...values: T
): Concat<T> {
  const result: any[] = []
  const append = (value: unknown) => value != null && result.push(value)
  for (const value of values) {
    if (Array.isArray(value)) {
      value.forEach(append)
    } else {
      append(value)
    }
  }
  return result as Concat<T>
}
