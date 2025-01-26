import { clone, isIntString } from 'radashi'

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
  if (value === undefined) {
    return initial
  }
  const root: any = clone(initial)
  const keys = path.match(/[^.[\]]+/g)
  keys?.reduce(
    (object, key, i) =>
      i < keys.length - 1
        ? (object[key] ??= isIntString(keys[i + 1]) ? [] : {})
        : (object[key] = value),
    root,
  )
  return root
}
