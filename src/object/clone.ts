import { isArray, isFunction, isMap, isObject, isSet } from 'radashi'

// biome-ignore lint/complexity/noBannedTypes:
type UnsafeFunction = Function

/**
 * Creates a shallow copy of the given object/value.
 *
 * It's assumed that you don't care about cloning `RegExp`/`Date`
 * objects or typed arrays like `Uint8Array`. In fact, the only cloned
 * object types are as follows:
 * * plain objects (including `Object.create(null)` objects)
 * * class instances
 * * arrays
 * * maps (but not `WeakMap`)
 * * sets (but not `WeakSet`)
 * * functions (but defined properties are not copied over)
 */
export function clone<T>(
  obj: T,
): T extends (...args: infer Args) => infer R
  ? (...args: Args) => R
  : T extends UnsafeFunction
    ? UnsafeFunction
    : T extends readonly (infer U)[]
      ? U[]
      : T

export function clone(obj: unknown): unknown {
  if (isObject(obj)) {
    const newObj = Object.create(Object.getPrototypeOf(obj))
    for (const key of Object.getOwnPropertyNames(obj)) {
      newObj[key] = obj[key as keyof object]
    }
    return newObj
  }

  if (isArray(obj)) {
    return obj.slice()
  }

  if (isMap(obj) || isSet(obj)) {
    return new (obj.constructor as any)(obj)
  }

  // Binding a function to an empty object creates a copy function.
  if (isFunction(obj)) {
    return obj.bind({})
  }

  return obj
}
