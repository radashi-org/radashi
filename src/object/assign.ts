import { isObject } from 'radashi'

/**
 * Merges two objects together recursivly into a new object applying
 * values from right to left. Recursion only applies to child object
 * properties.
 */
export const assign = <X extends Record<string | symbol | number, any>>(
  initial: X,
  override: X
): X => {
  if (!initial || !override) return initial ?? override ?? {}
  const merged = { ...initial }
  for (const key in override) {
    if (Object.prototype.hasOwnProperty.call(override, key)) {
      merged[key] = isObject(initial[key])
        ? assign(initial[key], override[key])
        : override[key]
    }
  }
  return merged
}
