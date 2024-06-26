import { isArray } from 'radashi'

export type KeyFilter<T extends object, Key extends keyof T = keyof T> =
  | KeyMatcher<T>
  | Key[]

export type KeyMatcher<T extends object> = (
  value: T[keyof T],
  key: keyof T,
  obj: T
) => boolean

export const matchKeys = <T extends object, Key extends keyof T = keyof T>(
  keys: KeyFilter<T, Key>
): KeyMatcher<T> =>
  isArray(keys)
    ? (_, key, obj) =>
        Object.hasOwnProperty.call(obj, key) && keys.includes(key as Key)
    : keys
