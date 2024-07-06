import { isArray, isFunction, isMap, isObject, isSet } from 'radashi'

// biome-ignore lint/complexity/noBannedTypes:
type UnsafeFunction = Function

/**
 * Creates a shallow copy of the given object/value.
 *
 * The only object types that get cloned are:
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
    return Object.create(
      Object.getPrototypeOf(obj),
      Object.getOwnPropertyDescriptors(obj),
    )
  }

  if (isArray(obj)) {
    // Use .slice to preserve sparseness.
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
