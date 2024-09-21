import {
  isPlainObject,
  type BoxedPrimitive,
  type BuiltInType,
  type CustomClass,
  type IsExactType,
  type OptionalKeys,
  type RequiredKeys,
} from 'radashi'

/**
 * Create a copy of the first object, and then merge the second object
 * into it recursively. Only plain objects are recursively merged.
 *
 * @see https://radashi.js.org/reference/object/assign
 * @example
 * ```ts
 * const a = { a: 0, b: 2, p: { a: 4 } }
 * const b = { a: 1, c: 3, p: { b: 5 } }
 *
 * assign(a, b)
 * // => { a: 1, b: 2, c: 3, p: { a: 4, b: 5 } }
 * ```
 * @version 12.1.0
 */
export function assign<
  TInitial extends Record<keyof any, any>,
  TOverride extends Record<keyof any, any>,
>(initial: TInitial, override: TOverride): Assign<TInitial, TOverride> {
  if (!initial || !override) {
    return (initial ?? override ?? {}) as any
  }
  const proto = Object.getPrototypeOf(initial)
  const merged = proto
    ? { ...initial }
    : Object.assign(Object.create(proto), initial)
  for (const key of Object.keys(override)) {
    merged[key] =
      isPlainObject(initial[key]) && isPlainObject(override[key])
        ? assign(initial[key], override[key])
        : override[key]
  }
  return merged
}

/**
 * The return type for `assign`.
 *
 * It recursively merges object types that are not native objects. The
 * root objects are always merged.
 *
 * @see https://radashi.js.org/reference/object/assign
 */
export type Assign<
  TInitial extends object,
  TOverride extends object,
> = TInitial extends any
  ? TOverride extends any
    ? SimplifyMutable<
        Omit<TInitial, keyof TOverride> &
          Omit<TOverride, keyof TInitial> &
          (Pick<
            TInitial,
            keyof TInitial & keyof TOverride
          > extends infer TConflictInitial
            ? Pick<
                TOverride,
                keyof TInitial & keyof TOverride
              > extends infer TConflictOverride
              ? {
                  [K in RequiredKeys<TConflictOverride>]: AssignDeep<
                    TConflictInitial[K & keyof TConflictInitial],
                    TConflictOverride[K]
                  >
                } & {
                  [K in RequiredKeys<TConflictInitial> &
                    OptionalKeys<TConflictOverride>]: AssignDeep<
                    TConflictInitial[K],
                    TConflictOverride[K],
                    true
                  >
                } & {
                  [K in OptionalKeys<TConflictInitial> &
                    OptionalKeys<TConflictOverride>]?: AssignDeep<
                    TConflictInitial[K],
                    TConflictOverride[K],
                    true
                  >
                }
              : unknown
            : unknown)
      >
    : never
  : never

/**
 * Mimic the `Simplify` type and also remove `readonly` modifiers.
 */
type SimplifyMutable<T> = {} & {
  -readonly [P in keyof T]: T[P]
}

/**
 * This represents a value that should only be replaced if it exists
 * as an initial value; never deeply assigned into.
 */
type AtomicValue = BuiltInType | CustomClass | BoxedPrimitive

/**
 * Handle mixed types when merging nested plain objects.
 *
 * For example, if the type `TOverride` includes both `string` and `{ n:
 * number }` in a union, `AssignDeep` will treat `string` as
 * unmergeable and `{ n: number }` as mergeable.
 */
type AssignDeep<TInitial, TOverride, IsOptional = false> =
  | never // ← Fixes auto-formatting of the comment below.
  /**
   * When a native type is found in TInitial, it will only exist in
   * the result type if the override is optional.
   */
  | (TInitial extends AtomicValue
      ? IsOptional extends true
        ? TInitial
        : never
      : never)
  /**
   * When a native type is found in TOverride, it will always exists
   * in the result type.
   */
  | (TOverride extends AtomicValue ? TOverride : never)
  /**
   * Deep assignment is handled in this branch.
   *
   * 1. Exclude any native types from TInitial and TOverride
   * 2. If a non-native object type is not found in TInitial, simply
   *    replace TInitial (or use "A | B" if the override is optional)
   * 3. For each non-native object type in TOverride, deep assign to
   *    every non-native object in TInitial
   * 4. For each non-object type in TOverride, simply replace TInitial
   *    (or use "A | B" if the override is optional)
   */
  | (Exclude<TOverride, AtomicValue> extends infer TOverride // 1.
      ? Exclude<TInitial, Exclude<AtomicValue, void>> extends infer TInitial
        ? [Extract<TInitial, object>] extends [never] // 2.
          ? TOverride | (IsOptional extends true ? TInitial : never)
          : TInitial extends object
            ? TOverride extends object
              ? IsExactType<TOverride, TInitial> extends true
                ? TOverride
                : Assign<TInitial, TOverride> // 3.
              : // 4.
                TOverride | (IsOptional extends true ? TInitial : never)
            :
                | Extract<TOverride, object>
                | (IsOptional extends true ? TInitial : never)
        : never
      : never)
