import { isArray, isFunction, isIterable, isPlainObject, last } from 'radashi'

/**
 * Iterate an object's properties and those of any nested objects.
 * “Non-array iterables” (e.g. Map and Set instances) are only
 * traversed when they are the root object.
 *
 * - By default, only plain objects and arrays are traversed.
 *
 * - The traversal is performed in a depth-first manner.
 *
 * - **Non-Enumerable Properties**  \
 *   Only enumerable properties are traversed by default. The
 *   `ownKeys` callback can be customized to traverse non-enumerable
 *   properties (try passing `Reflect.ownKeys`).
 *
 * - **Early Return**  \
 *   The `visitor` callback can return `false` to stop the traversal.
 *
 * - **Skipping**  \
 *   To skip traversal of an object, call `context.skip(obj)`. If the
 *   current value is an object, you may call `context.skip()` without
 *   an argument to skip it.
 *
 * - **Nested Iterables & Class Instances**  \
 *   To traverse a nested iterable or class instance, you can call
 *   `traverse` inside your `visitor` callback recursively, but make
 *   sure to pass the `context` object to it.
 */
export function traverse(
  root: object,
  visitor: TraverseVisitor,
  outerContext?: TraverseContext | null,
  ownKeys: (parent: object) => Iterable<keyof any> = Object.keys,
): boolean {
  const context = (
    outerContext
      ? { ...outerContext }
      : {
          value: null,
          key: null,
          parent: null,
          parents: [],
          path: [],
          skipped: new Set(),
          skip(obj) {
            context.skipped.add(obj ?? context.value)
          },
        }
  ) as TraverseContext & {
    value: unknown
    key: keyof any
    parent: any
    parents: object[]
    path: (keyof any)[]
    skipped: Set<unknown>
  }

  let ok = true

  // This is called for each value in an object or iterable.
  const visit = (value: unknown, key: keyof any): boolean => {
    // Map entries are destructured into value and key.
    if (context.parent.constructor === Map) {
      ;[key, value] = value as [keyof any, unknown]
    }

    context.path.push(key)
    const result = visitor(
      (context.value = value),
      (context.key = key),
      context.parent,
      context,
    )

    if (result === false) {
      return (ok = false)
    }

    // Traverse nested plain objects and arrays that haven't been
    // skipped and aren't a circular reference.
    if (
      value !== null &&
      typeof value === 'object' &&
      (isArray(value) || isPlainObject(value)) &&
      !context.skipped.has(value) &&
      !context.parents.includes(value)
    ) {
      traverse(value)

      if (isFunction(result)) {
        result()
      }
    }

    context.path.pop()
    return ok
  }

  const traverse = (parent: object, isRoot?: boolean): boolean => {
    context.parents.push(parent)
    context.parent = parent

    if (isArray(parent)) {
      // Use Array.prototype.forEach for arrays so that sparse arrays
      // are efficiently traversed. The array must be cloned so it can
      // be cleared if the visitor returns false.
      parent.slice().forEach((value, index, values) => {
        if (visit(value, index) === false) {
          values.length = 0 // Stop further traversal.
        }
      })
    }
    // Allow an iterable (e.g. a Map or a Set) to be passed in as the
    // root object.
    else if (isRoot && isIterable(parent)) {
      let index = 0
      for (const value of parent) {
        if (visit(value, index) === false) {
          return false
        }
        index++
      }
    }
    // Traverse the object's properties.
    else {
      for (const key of ownKeys(parent)) {
        if (visit(parent[key as keyof object], key) === false) {
          return false
        }
      }
    }

    context.parents.pop()
    context.parent = last(context.parents)

    return ok
  }

  // If this is a recursive call, it's possible that the root object
  // was skipped earlier. Check for that here so the caller doesn't
  // have to check for it.
  return outerContext?.skipped.has(root) || traverse(root, true)
}

/**
 * The visitor callback for the `traverse` function.
 */
export type TraverseVisitor = (
  value: unknown,
  key: keyof any,
  parent: object,
  context: TraverseContext,
) => (() => void) | boolean | void

/**
 * The context object for the `traverse` function.
 */
export interface TraverseContext {
  /**
   * The current value being traversed.
   */
  readonly value: unknown
  /**
   * The property key or index with which the current value was found.
   */
  readonly key: keyof any
  /**
   * The parent object of the current value.
   */
  readonly parent: object
  /**
   * The stack of parent objects. The last object is the current
   * parent.
   *
   * ⚠️ This array must not be mutated directly or referenced outside
   * the `visitor` callback. If that's necessary, you'll want to clone
   * it first.
   */
  readonly parents: readonly object[]
  /**
   * The path to the `parent` object. The last key is the current key.
   *
   * ⚠️ This array must not be mutated directly or referenced outside
   * the `visitor` callback. If that's necessary, you'll want to clone
   * it first.
   */
  readonly path: readonly (keyof any)[]
  /**
   * When the current value is a traversable object/iterable, this
   * function can be used to skip traversing it altogether.
   *
   * If the `obj` argument is provided, it marks the given object as
   * skipped (instead of the current value), preventing it from being
   * traversed.
   */
  readonly skip: (obj?: object) => void
  readonly skipped: ReadonlySet<unknown>
}
