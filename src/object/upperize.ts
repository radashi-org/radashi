import { mapKeys } from 'radashi'

type UppercasedKeys<T extends Record<string, any>> = {
  [P in keyof T & string as Uppercase<P>]: T[P]
}

/**
 * Convert all keys in an object to upper case
 */
export function upperize<T extends Record<string, any>>(obj: T) {
  return mapKeys(obj, k => k.toUpperCase()) as UppercasedKeys<T>
}
