/**
 * Merges two option objects into a new object.\
 * If both arguments are defined, properties
 * from the second object (`b`) will override those
 * from the first one (`a`) when keys overlap.\
 * If either argument is `undefined`, the other is returned.\
 * If both are `undefined`, the result is `undefined`.
 *
 * @param a - The first options object, or `undefined`.
 * @param b - The second options object, or `undefined`.
 * @returns A new object containing merged properties, or `undefined` if both are `undefined`.
 *
 * @see https://radashi.js.org/reference/objects/mergeOptions
 *
 * @example
 * ```ts
 * mergeOptions({ a: 1, b: 2 }, { b: 3, c: 4 })
 * // => { a: 1, b: 3, c: 4 }
 * ```
 *
 * @example
 * ```ts
 * mergeOptions(undefined, { a: 1 })
 * // => { a: 1 }
 * ```
 *
 * @example
 * ```ts
 * mergeOptions({ a: 1 }, undefined)
 * // => { a: 1 }
 * ```
 *
 * @example
 * ```ts
 * mergeOptions(undefined, undefined)
 * // => undefined
 * ```
 *
 * @since v12.6.3
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
 * @since 12.6.3
 */
export type MergeOptions<
  A extends object | undefined,
  B extends object | undefined,
> = [A, B] extends [undefined, undefined]
  ? undefined
  : [A] extends [undefined]
    ? Expand<NonNull<B>>
    : [B] extends [undefined]
      ? Expand<NonNull<A>>
      : Expand<MergeObjects<UndefinedToPartial<NonNullable<A>>, NonNullable<B>>>

type NonNull<T> = {} & T
type Expand<T> = T extends object ? { [K in keyof T]: Expand<T[K]> } : T
type UndefinedToPartial<T> = T extends object
  ? undefined extends T
    ? Partial<Omit<T, undefined>>
    : T
  : T

type MergeObjects<A extends object, B extends object> = {
  [K in keyof A | keyof B]: K extends keyof B
    ? B[K]
    : K extends keyof A
      ? A[K]
      : never
}
