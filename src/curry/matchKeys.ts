import { isArray } from 'radashi'

type KeyOf<T extends object> = object extends T ? keyof any : keyof T
type ValueOf<T extends object> = object extends T ? unknown : T[keyof T]

export type KeyMatcher<T extends object = object> = (
  value: ValueOf<T>,
  key: KeyOf<T>,
  obj: T
) => boolean

/**
 * Functions can use this type to accept either an array of keys or a
 * filter callback. This provides type safety for such a parameter
 * type, whose value can then be passed into `matchKeys` to receive a
 * matching function.
 */
export type KeyFilter<
  T extends object = object,
  Key extends KeyOf<T> = KeyOf<T>
> = KeyMatcher<T> | readonly Key[]

/**
 * Wrap an array of keys with a “key matcher” function that returns
 * true if a given key-value pair is both in the array and an
 * enumerable property in the given object.
 *
 * If you pass in a function, it will be returned as is. The function
 * should have a `(value, key, obj) => boolean` signature.
 */
export const matchKeys = (keys: KeyFilter): KeyMatcher =>
  isArray(keys)
    ? (_, key, obj) =>
        Object.hasOwnProperty.call(obj, key) && keys.includes(key)
    : keys
