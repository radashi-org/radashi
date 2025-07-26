/**
 * Check if a property key is “dangerous” in the sense that it could
 * be used to modify built-in objects, possibly leading to prototype
 * pollution or other unintended side effects.
 *
 * If you pass an object, it will be checked for a `null` prototype,
 * in which case, the key will be considered safe.
 *
 * @see https://radashi.js.org/reference/object/isDangerousKey
 * @version 12.5.1
 */
export function isDangerousKey(key: PropertyKey, object?: object): boolean {
  return (
    !(object && !Object.getPrototypeOf(object)) &&
    (key === '__proto__' || key === 'prototype' || key === 'constructor')
  )
}
