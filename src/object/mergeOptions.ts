import type { OptionalKeys, RequiredKeys } from 'radashi'

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
 * @returns A merged object when both arguments are defined, otherwise the defined argument, or `undefined` if both are `undefined`.
 * @version 12.9.0
 *
 * @see https://radashi.js.org/reference/object/mergeOptions
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
 * @version 12.9.0
 */
export type MergeOptions<
  A extends object | undefined,
  B extends object | undefined,
> =
  | (undefined extends A ? B : never)
  | (undefined extends B ? NonNullable<A> : never)
  | MergePresent<NonNullable<A>, NonNullable<B>>

type Expand<T> = T extends object ? { [K in keyof T]: Expand<T[K]> } : T

type MergePresent<A, B> = [A, B] extends [never, never]
  ? never
  : A extends object
    ? B extends object
      ? Expand<MergeObjects<A, B>>
      : never
    : never

type MergeObjects<A extends object, B extends object> = {
  [K in MergeRequiredKeys<A, B>]: MergeValue<A, B, K>
} & {
  [K in MergeOptionalKeys<A, B>]?: MergeValue<A, B, K>
}

type MergeRequiredKeys<A extends object, B extends object> =
  | RequiredKeys<B>
  | Exclude<RequiredKeys<A>, keyof B>
  | (RequiredKeys<A> & OptionalKeys<B>)

type MergeOptionalKeys<A extends object, B extends object> =
  | Exclude<OptionalKeys<A>, keyof B>
  | Exclude<OptionalKeys<B>, RequiredKeys<A>>

type MergeValue<
  A extends object,
  B extends object,
  K extends keyof A | keyof B,
> = K extends keyof B
  ? K extends OptionalKeys<B>
    ? K extends keyof A
      ? PropValue<A, K> | PropValue<B, K>
      : PropValue<B, K>
    : B[K]
  : K extends keyof A
    ? PropValue<A, K>
    : never

type PropValue<T extends object, K extends keyof T> = K extends OptionalKeys<T>
  ? Required<Pick<T, K>>[K]
  : T[K]
