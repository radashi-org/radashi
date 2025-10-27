/**
 * Merges two option objects into a new object.
 * - If both arguments are defined, properties
 *   from the second object (`b`) will override those
 *   from the first one (`a`) when keys overlap
 * - If either argument is `undefined`, the other is returned
 * - If both are `undefined`, the result is `undefined`
 *
 * @param a - The first options object, or `undefined`.
 * @param b - The second options object, or `undefined`.
 * @returns A new object containing merged properties, or `undefined` if both are `undefined`.
 * @since v12.7.0
 *
 * @see https://radashi.js.org/reference/objects/mergeOptions
 *
 * @example
 * ```ts
 * // Merging two objects with overlapping keys
 * mergeOptions({ a: 1, b: 2 }, { b: 3, c: 4 })
 * // => { a: 1, b: 3, c: 4 }
 *
 * // First argument undefined
 * mergeOptions(undefined, { a: 1 })
 * // => { a: 1 }
 *
 * // Second argument undefined
 * mergeOptions({ a: 1 }, undefined)
 * // => { a: 1 }
 *
 * // Both arguments undefined
 * mergeOptions(undefined, undefined)
 * // => undefined
 * ```
 */
export function mergeOptions<
  A extends object | undefined,
  B extends object | undefined,
>(a: A, b: B): MergeOptions<A, B>
export function mergeOptions(
  a: object | undefined,
  b: object | undefined,
): object | undefined {
  if (a === undefined) {
    return b
  }
  if (b === undefined) {
    return a
  }
  return { ...a, ...b }
}

/**
 * Computes the merged type of two option objects, handling `undefined` and partials.
 *
 * @since v12.7.0
 */
export type MergeOptions<
  A extends object | undefined,
  B extends object | undefined,
> = [A, B] extends [undefined, undefined]
  ? undefined
  : [A] extends [undefined]
    ? Expand<NonNullable<B>>
    : [B] extends [undefined]
      ? Expand<NonNullable<A>>
      : Expand<MergeObjects<UndefinedToPartial<NonNullable<A>>, NonNullable<B>>>

type Expand<T> = T extends object ? { [K in keyof T]: Expand<T[K]> } : T

type UndefinedToPartial<T extends object | undefined> = T extends undefined
  ? undefined
  : undefined extends T
    ? Partial<NonNullable<T>>
    : T

type MergeObjects<A, B> = {
  [K in keyof A | keyof B]:
    K extends keyof B
      ? (undefined extends B[K]
          ? (Exclude<B[K], undefined> | (K extends keyof A ? A[K] : never))
          : B[K]
        )
      : (K extends keyof A ? A[K] : never)
}
