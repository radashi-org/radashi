/**
 * Omit a list of properties from an object returning a new object
 * with the properties that remain.
 *
 * @see https://radashi.js.org/reference/object/omit
 * @example
 * ```ts
 * const a = { a: 1, b: 2, c: 3 }
 * omit(a, ['b'])
 * // => { a: 1, c: 3 }
 * ```
 * @version 12.1.0
 */
export function omit<T, TKeys extends keyof T>(
  obj: T,
  keys: readonly TKeys[],
): Omit<T, TKeys> {
  if (!obj) {
    return {} as Omit<T, TKeys>
  }
  if (!keys || keys.length === 0) {
    return obj as Omit<T, TKeys>
  }
  return keys.reduce(
    (acc, key) => {
      // Gross, I know, it's mutating the object, but we are allowing
      // it in this very limited scope due to the performance
      // implications of an omit func. Not a pattern or practice to
      // use elsewhere.
      delete acc[key]
      return acc
    },
    { ...obj },
  )
}
