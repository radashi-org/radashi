import { mapKeys } from './mapKeys'

type LowercasedKeys<T extends Record<string, any>> = {
  [P in keyof T & string as Lowercase<P>]: T[P]
}

/**
 * Convert all keys in an object to lower case
 */
export const lowerize = <T extends Record<string, any>>(obj: T) =>
  mapKeys(obj, k => k.toLowerCase()) as LowercasedKeys<T>
