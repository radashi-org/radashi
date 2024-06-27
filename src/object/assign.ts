import { isPlainObject } from 'radashi'

/**
 * Merges two objects together recursivly into a new object applying
 * values from right to left. Recursion only applies to child object
 * properties.
 */
export function assign<X extends Record<string | symbol | number, any>>(
  initial: X,
  override: X
): X {
  if (!initial || !override) {
    return initial ?? override ?? {}
  }
  const proto = Object.getPrototypeOf(initial)
  const merged = proto
    ? { ...initial }
    : Object.assign(Object.create(proto), initial)
  for (const key in override) {
    if (Object.prototype.hasOwnProperty.call(override, key)) {
      merged[key] = isPlainObject(initial[key])
        ? assign(initial[key], override[key])
        : override[key]
    }
  }
  return merged
}
