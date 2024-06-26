import { KeyFilter, filterKey, isArray } from 'radashi'

type ReducedKey<T, Key> = Key extends never ? keyof T : Extract<keyof T, Key>
type ReducedValue<T, Key> = ReducedKey<T, Key> extends infer K extends keyof T
  ? T[K]
  : never

export const reduceKeys: {
  <T extends object, Key extends keyof any, Result>(
    obj: T,
    keys: KeyFilter<T, Key> | null | undefined,
    reducer: (
      acc: Result,
      value: ReducedValue<T, Key>,
      key: ReducedKey<T, Key>,
      obj: T
    ) => Result,
    initial: Result
  ): Result
  <T extends object, Key extends keyof any, Result, Acc extends Result>(
    obj: T,
    keys: KeyFilter<T, Key> | null | undefined,
    reducer: (
      acc: Acc | undefined,
      value: ReducedValue<T, Key>,
      key: ReducedKey<T, Key>,
      obj: T
    ) => Result
  ): Result | undefined
} = (
  obj: object,
  filter: KeyFilter | null | undefined,
  reducer: (
    result: unknown,
    value: unknown,
    key: keyof any,
    obj: object
  ) => any,
  initial?: unknown
) => {
  let keys: readonly (keyof any)[] | undefined
  if (isArray(filter)) [keys, filter] = [filter, null]
  return (keys || Reflect.ownKeys(obj)).reduce(
    (result, key) =>
      filterKey(obj, key, filter)
        ? reducer(result, obj[key as keyof object], key, obj)
        : result,
    initial
  )
}
