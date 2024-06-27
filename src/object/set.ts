import { clone, isIntString } from 'radashi'

/**
 * Opposite of get, dynamically set a nested value into an object
 * using a key path. Does not modify the given initial object.
 *
 * ```ts
 * set({}, 'name', 'ra') // => { name: 'ra' }
 * set({}, 'cards[0].value', 2) // => { cards: [{ value: 2 }] }
 * ```
 */
export function set<T extends object, K>(
  initial: T,
  path: string,
  value: K,
): T {
  if (!initial) {
    return {} as T
  }
  if (!path || value === undefined) {
    return initial
  }

  // NOTE: One day, when structuredClone has more compatability use it
  // to clone the value
  // https://developer.mozilla.org/en-US/docs/Web/API/structuredClone
  const root: any = clone(initial)
  const keys = path.match(/[^.[\]]+/g)
  if (keys) {
    keys.reduce(
      (object, key, i) =>
        i < keys.length - 1
          ? (object[key] ??= isIntString(keys[i + 1]) ? [] : {})
          : (object[key] = value),
      root,
    )
  }

  return root
}
