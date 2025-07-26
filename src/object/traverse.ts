import { isArray, isFunction, isIterable, isPlainObject, last } from 'radashi'

export interface TraverseOptions<Key = string | number | symbol> {
  /**
   * A function that returns the keys of the object to be traversed.
   *
   * @default Object.keys
   */
  ownKeys?: ((parent: object) => Iterable<Key>) | null
  /**
   * When true, the visitor callback will be invoked for the root object.
   *
   * @default false
   */
  rootNeedsVisit?: boolean | null
}

/**
 * Recursively visit each property of an object (or each element of an
 * array) and its nested objects or arrays. By default, the only
 * nested objects to be traversed are plain objects and arrays.
 *
 * @see https://radashi.js.org/reference/object/traverse
 * @example
 * ```ts
 * import { traverse } from 'radashi'
 *
 * const root = { a: 1, b: { c: { d: [2] }, e: 3 } }
 *
 * traverse(root, (value, key, parent, context) => {
 *   console.log(key, '=>', value)
 * })
 * // Logs the following:
 * //   a => 1
 * //   b => { … }
 * //   c => { … }
 * //   d => [ 2 ]
 * //   0 => 2
 * //   e => 3
 * ```
 * @version 12.2.0
 */
export function traverse(
  root: object,
  visitor: TraverseVisitor,
  options?: (TraverseOptions & { rootNeedsVisit?: null }) | null,
  outerContext?: TraverseContext,
): boolean

export function traverse(
  root: object,
  visitor: TraverseVisitor<keyof any | null>,
  options?: TraverseOptions<keyof any | null> | null,
  outerContext?: TraverseContext<keyof any | null>,
): boolean

export function traverse(
  root: object,
  visitor: TraverseVisitor<any>,
  options?: TraverseOptions<any> | null,
  outerContext?: TraverseContext<any> | null,
): boolean {
  const context = (outerContext ?? {
    value: null,
    key: null,
    parent: null,
    parents: [],
    path: [],
    skipped: new Set(),
    skip(obj) {
      context.skipped.add(obj ?? context.value)
    },
  }) as TraverseContext<keyof any | null> & {
    value: unknown
    key: keyof any | null
    parent: any
    parents: object[]
    path: (keyof any)[]
    skipped: Set<unknown>
  }

  const { rootNeedsVisit } = (options ??= {})
  const ownKeys = options.ownKeys ?? Object.keys
  const nestedOptions = {
    ...options,
    rootNeedsVisit: null,
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
      nestedOptions,
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
      traverse(value, result)
    }

    context.path.pop()
    return ok
  }

  const traverse = (
    parent: object,
    parentResult?: ReturnType<TraverseVisitor>,
  ): boolean => {
    context.parents.push(parent)
    context.parent = parent

    if (rootNeedsVisit && parent === root) {
      parentResult = visitor(
        (context.value = parent),
        (context.key = null),
        context.parent,
        context,
        nestedOptions,
      )
      if (parentResult === false) {
        return ok
      }
    }

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
    else if (parent === root && isIterable(parent)) {
      let index = 0
      for (const value of parent) {
        if (visit(value, index) === false) {
          return ok
        }
        index++
      }
    }
    // Traverse the object's properties.
    else {
      for (const key of ownKeys(parent)) {
        if (visit(parent[key as keyof object], key) === false) {
          return ok
        }
      }
    }

    context.parents.pop()
    context.parent = last(context.parents)

    // Invoke the leave callback for the completed parent.
    if (ok && isFunction(parentResult)) {
      ok = parentResult() !== false
    }

    return ok
  }

  if (outerContext) {
    // If this is a recursive call, it's possible that the root object
    // was skipped earlier. Check for that here so the caller doesn't
    // have to check for it.
    if (outerContext.skipped.has(root)) {
      return true
    }

    // We'll have to restore the context after the traversal because
    // it might be used by the caller.
    const { value, key } = context

    traverse(root)

    context.value = value
    context.key = key
    return ok
  }

  return traverse(root)
}

/**
 * The visitor callback for the `traverse` function.
 */
export type TraverseVisitor<Key = keyof any> = (
  value: unknown,
  key: Key,
  parent: object,
  context: TraverseContext<Key>,
  options: TraverseOptions<Key> & { rootNeedsVisit?: null },
) => (() => boolean | void) | boolean | void

/**
 * The context object for the `traverse` function.
 */
export interface TraverseContext<Key = keyof any> {
  /**
   * The current value being traversed.
   */
  readonly value: unknown
  /**
   * The property key or index with which the current value was found.
   */
  readonly key: Key
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
