import { mapKeys } from './mapKeys'

type UppercasedKeys<T extends Record<string, any>> = {
  [P in keyof T & string as Uppercase<P>]: T[P]
}

/**
 * Convert all keys in an object to upper case
 */
export const upperize = <T extends Record<string, any>>(obj: T) =>
  mapKeys(obj, k => k.toUpperCase()) as UppercasedKeys<T>
