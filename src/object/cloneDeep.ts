import { isArray, isMap, isObject, isSet } from 'radashi'

/**
 * A strategy for cloning objects with `cloneDeep`.
 *
 * Methods **must** call the `track` function with the new parent
 * object **before** looping over the input object's
 * properties/elements for cloning purposes. This protects against
 * circular references.
 *
 * Methods may return the input object to indicate that cloning should
 * be skipped.
 *
 * Methods may return null to indicate that the default cloning logic
 * should be used.
 * @version 12.2.0
 */
export interface CloningStrategy {
  cloneMap: <K, V>(
    parent: Map<K, V>,
    track: (newParent: Map<K, V>) => Map<K, V>,
    clone: <T>(value: T) => T,
  ) => Map<K, V> | null
  cloneSet: <T>(
    parent: Set<T>,
    track: (newParent: Set<T>) => Set<T>,
    clone: <T>(value: T) => T,
  ) => Set<T> | null
  cloneArray: <T>(
    parent: readonly T[],
    track: (newParent: T[]) => T[],
    clone: <T>(value: T) => T,
  ) => T[] | null
  cloneObject: <T extends object>(
    parent: T,
    track: (newParent: T) => T,
    clone: <T>(value: T) => T,
  ) => T | null
  cloneOther: <T>(
    parent: T,
    track: (newParent: T) => T,
    clone: <T>(value: T) => T,
  ) => T | null
}

export const DefaultCloningStrategy: CloningStrategy = {
  cloneMap<K, V>(
    input: Map<K, V>,
    track: (newParent: Map<K, V>) => Map<K, V>,
    clone: <T>(value: T) => T,
  ): Map<K, V> {
    const output = track(new Map())
    for (const [key, value] of input) {
      output.set(key, clone(value))
    }
    return output
  },
  cloneSet<T>(
    input: Set<T>,
    track: (newParent: Set<T>) => Set<T>,
    clone: <T>(value: T) => T,
  ): Set<T> {
    const output = track(new Set())
    for (const value of input) {
      output.add(clone(value))
    }
    return output
  },
  cloneArray<T>(
    input: readonly T[],
    track: (newParent: T[]) => T[],
    clone: <T>(value: T) => T,
  ): T[] {
    // Use .forEach for correct handling of sparse arrays
    const output = track(new Array(input.length))
    input.forEach((value, index) => {
      output[index] = clone(value)
    })
    return output
  },
  cloneObject<T extends object>(
    input: T,
    track: (newParent: T) => T,
    clone: <T>(value: T) => T,
  ): T {
    const output = track(Object.create(Object.getPrototypeOf(input)))
    for (const key of Reflect.ownKeys(input)) {
      // By copying the property descriptors, we preserve computed
      // properties and non-enumerable properties.
      const descriptor = Object.getOwnPropertyDescriptor(input, key)!
      if ('value' in descriptor) {
        descriptor.value = clone(descriptor.value)
      }
      Object.defineProperty(output, key, descriptor)
    }
    return output
  },
  cloneOther<T>(input: T, track: (newParent: T) => T): T {
    return track(input)
  },
}

/**
 * If you don't need support for non-enumerable properties or computed
 * properties, and you're not using custom classes, you can use this
 * strategy for better performance.
 */
export const FastCloningStrategy = {
  cloneObject: <T extends object>(
    input: T,
    track: (newParent: T) => T,
    clone: <T>(value: T) => T,
  ): T => {
    const output: any = track({ ...input })
    for (const key of Object.keys(input)) {
      output[key] = clone(input[key as keyof object])
    }
    return output
  },
}

/**
 * Clone the given object and possibly other objects nested inside.
 *
 * By default, the only objects that get cloned are plain objects,
 * non-native class instances, arrays, `Set` instances, and `Map`
 * instances. If an object is not cloned, any objects nested inside
 * are also not cloned.
 *
 * You may define a custom cloning strategy by passing a partial
 * implementation of the `CloningStrategy` interface to the
 * `cloneDeep` function. Any undefined methods will fall back to the
 * default cloning logic. Your own methods may return null to indicate
 * that the default cloning logic should be used. They may also return
 * the input object to indicate that cloning should be skipped.
 *
 * ```ts
 * const obj = { a: 1, b: { c: 2 } }
 * const clone = cloneDeep(obj)
 *
 * assert(clone !== obj)
 * assert(clone.b !== obj.b)
 * assert(JSON.stringify(clone) === JSON.stringify(obj))
 * ```
 */
export function cloneDeep<T extends object>(
  root: T,
  customStrategy?: Partial<CloningStrategy>,
): T {
  const strategy = { ...DefaultCloningStrategy, ...customStrategy }

  const tracked = new Map<unknown, unknown>()
  const track = (parent: unknown, newParent: unknown) => {
    tracked.set(parent, newParent)
    return newParent
  }

  const clone = <T>(value: T): T =>
    value && typeof value === 'object'
      ? ((tracked.get(value) ?? cloneDeep(value, strategy)) as T)
      : value

  const cloneDeep = (parent: unknown, strategy: CloningStrategy): unknown => {
    const cloneParent = (
      isObject(parent)
        ? strategy.cloneObject
        : isArray(parent)
          ? strategy.cloneArray
          : isMap(parent)
            ? strategy.cloneMap
            : isSet(parent)
              ? strategy.cloneSet
              : strategy.cloneOther
    ) as (
      newParent: unknown,
      track: (newParent: unknown) => unknown,
      clone: (value: unknown) => unknown,
    ) => unknown

    const newParent = cloneParent(parent, track.bind(null, parent), clone)
    if (!newParent) {
      // Use the default strategy if null is returned.
      return cloneDeep(parent, DefaultCloningStrategy)
    }

    tracked.set(parent, newParent)
    return newParent
  }

  return cloneDeep(root, strategy) as T
}
