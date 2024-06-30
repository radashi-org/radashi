import { mapKeys } from 'radashi'

export type UppercaseKeys<T extends Record<string, any>> = {
  [P in keyof T & string as Uppercase<P>]: T[P]
}

/**
 * Convert all keys in an object to upper case
 */
export function upperize<T extends Record<string, any>>(
  obj: T,
): UppercaseKeys<T> {
  return mapKeys(obj, k => k.toUpperCase()) as UppercaseKeys<T>
}
