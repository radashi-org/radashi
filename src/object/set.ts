import { clone, isDangerousKey, isIntString } from 'radashi'

/**
 * Opposite of get, dynamically set a nested value into an object
 * using a key path. Does not modify the given initial object.
 *
 * @see https://radashi.js.org/reference/object/set
 * @example
 * ```ts
 * set({}, 'name', 'ra') // => { name: 'ra' }
 * set({}, 'cards[0].value', 2) // => { cards: [{ value: 2 }] }
 * ```
 * @version 12.1.0
 */
export function set<T extends object, K>(
  initial: T,
  path: string,
  value: K,
): T {
  if (value === undefined || path.length === 0) {
    return initial
  }
  return (function recurse(object: any, keys: string[], index: number) {
    const key = keys[index]

    object ??= isIntString(key) ? [] : {}

    if (isDangerousKey(key, object)) {
      throw new Error('Unsafe key in path: ' + key)
    }

    if (index < keys.length - 1) {
      value = recurse(object[key], keys, index + 1)
    }

    if (!Object.is(object[key], value)) {
      object = clone(object)
      object[key] = value
    }

    return object
  })(initial, path.match(/[^.[\]]+/g)!, 0)
}
