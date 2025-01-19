import { type KeyFilter, filterKey, isArray } from 'radashi'

type ReducedKey<T, Key> = Key extends never ? keyof T : Extract<keyof T, Key>
type ReducedValue<T, Key> = ReducedKey<T, Key> extends infer K extends keyof T
  ? T[K]
  : never

/**
 * Reduce an object's keys to a single value.
 *
 * Note if only 2 arguments are passed, the reducer starts with the
 * first property value as its initial value. If the object only has
 * one key, then the value of that key is returned (and the reducer is
 * never called).
 *
 * ```
 * const obj = { a: 1, b: 2, c: 3 }
 * const sum = reduceKeys(obj, (acc, value, key, obj) => acc + value, 0)
 * console.log(sum) // 6
 * ```
 */
export function reduceKeys<T extends object, Key extends keyof any, Result>(
  obj: T,
  keys: KeyFilter<T, Key> | null | undefined,
  reducer: (
    acc: Result,
    value: ReducedValue<T, Key>,
    key: ReducedKey<T, Key>,
    obj: T,
  ) => Result,
  initial: Result,
): Result

export function reduceKeys<
  T extends object,
  Key extends keyof any,
  Result,
  Acc extends Result,
>(
  obj: T,
  keys: KeyFilter<T, Key> | null | undefined,
  reducer: (
    acc: Acc | ReducedValue<T, Key> | undefined,
    value: ReducedValue<T, Key>,
    key: ReducedKey<T, Key>,
    obj: T,
  ) => Result,
): Result | ReducedValue<T, Key>

export function reduceKeys(
  obj: object,
  filter: KeyFilter | null | undefined,
  reducer: (
    result: unknown,
    value: unknown,
    key: keyof any,
    obj: object,
  ) => any,
  ...args: [unknown?]
) {
  let keys: readonly (keyof any)[] | undefined
  if (isArray(filter)) {
    ;[keys, filter] = [filter, null]
  }
  return (keys || Reflect.ownKeys(obj)).reduce(
    (acc, key) =>
      filterKey(obj, key, filter)
        ? reducer(acc, obj[key as keyof object], key, obj)
        : acc,
    // Array.prototype.reduce behavior changes based on arity, so the
    // initial value must be passed via the spread operator.
    ...args,
  )
}
