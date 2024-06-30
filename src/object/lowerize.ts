import { mapKeys } from 'radashi'

export type LowercaseKeys<T extends Record<string, any>> = {
  [P in keyof T & string as Lowercase<P>]: T[P]
}

/**
 * Convert all keys in an object to lower case
 */
export function lowerize<T extends Record<string, any>>(
  obj: T,
): LowercaseKeys<T> {
  return mapKeys(obj, k => k.toLowerCase()) as LowercaseKeys<T>
}
