import { isArray } from 'radashi'

type KeyOf<T extends object> = object extends T ? keyof any : keyof T
type ValueOf<T extends object> = object extends T ? unknown : T[keyof T]

export type KeyFilterFunction<T extends object = object> = (
  value: ValueOf<T>,
  key: KeyOf<T>,
  obj: T,
) => boolean

/**
 * Functions can use this type to accept either an array of keys or a
 * filter function.
 */
export type KeyFilter<
  T extends object = object,
  Key extends keyof any = keyof any,
> = KeyFilterFunction<T> | readonly Key[]

/**
 * Extract the keys of an object that pass a filter.
 */
export type FilteredKeys<
  T extends object,
  F extends KeyFilter<T> | null | undefined,
> = Extract<keyof T, F extends readonly any[] ? F[number] : any>

/**
 * Returns true if the key is in the “keys array” or if the “filter
 * function” returns true.
 */
export function filterKey<T extends object>(
  obj: T,
  key: keyof T,
  filter: KeyFilter<T, keyof T> | null | undefined,
): boolean {
  return (
    Object.hasOwnProperty.call(obj, key) &&
    (filter == null ||
      (isArray(filter)
        ? filter.includes(key)
        : filter((obj as any)[key], key, obj)))
  )
}
