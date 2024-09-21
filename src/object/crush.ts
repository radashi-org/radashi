import { type Intersect, isArray, isObject, type Simplify } from 'radashi'

/**
 * Flattens a deep object to a single dimension, converting the keys
 * to dot notation.
 *
 * @see https://radashi.js.org/reference/object/crush
 * @example
 * ```ts
 * crush({ name: 'ra', children: [{ name: 'hathor' }] })
 * // { name: 'ra', 'children.0.name': 'hathor' }
 * ```
 * @version 12.1.0
 */
export function crush<T extends object>(value: T): Crush<T> {
  if (!value) {
    return {} as Crush<T>
  }
  return (function crushReducer(
    crushed: Crush<T>,
    value: unknown,
    path: string,
  ) {
    if (isObject(value) || isArray(value)) {
      for (const [prop, propValue] of Object.entries(value)) {
        crushReducer(crushed, propValue, path ? `${path}.${prop}` : prop)
      }
    } else {
      crushed[path as keyof Crush<T>] = value as Crush<T>[keyof Crush<T>]
    }
    return crushed
  })({} as Crush<T>, value, '')
}

/**
 * The return type of the `crush` function.
 *
 * This type is limited by TypeScript's development. There's no
 * reliable way to detect if an object will pass `isObject` or not, so
 * we cannot infer the property types of nested objects that have been
 * crushed.
 *
 * @see https://radashi.js.org/reference/object/crush
 */
export type Crush<T> = T extends readonly (infer U)[]
  ? Record<string, U extends object ? unknown : U>
  : Simplify<
      Intersect<
        keyof T extends infer Prop
          ? Prop extends keyof T
            ? T[Prop] extends infer Value
              ?
                  | ([Extract<Value, object>] extends [never]
                      ? never
                      : Record<string, unknown>)
                  | ([Exclude<Value, object>] extends [never]
                      ? never
                      : [Extract<Value, object>] extends [never]
                        ? { [P in Prop]: Value }
                        : Record<string, unknown>)
              : never
            : never
          : never
      >
    >
