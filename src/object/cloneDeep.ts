import { traverse, type TraverseContext } from 'radashi'

/**
 * Traverse an object deeply, mapping the root object and any objects
 * nested within.
 *
 * The `mapper` callback is responsible for creating a **shallow**
 * clone of the received object. If you return the received object
 * without cloning it, traversal is skipped. To allow for maximum
 * flexibility, the `mapper` callback receives all object types,
 * including `RegExp`, `Date`, etc.
 *
 * ```ts
 * import { clone, cloneDeep } from 'radashi'
 *
 * // Just plain objects
 * let obj = { a: 1, b: { c: 2 } }
 * let clone = cloneDeep(obj, (value) => ({ ...value }))
 *
 * // Complex objects like RegExp and arrays
 * obj = { a: /regexp/, b: [1, 2, 3] }
 * let clone = cloneDeep(obj, clone)
 * ```
 */
export function cloneDeep<Root extends object>(
  root: Root,
  mapper: (obj: object, context?: TraverseContext) => object,
  outerContext?: TraverseContext,
  ownKeys: (obj: object) => Iterable<keyof any> = Object.keys,
): Root {
  const clone = mapper(root, outerContext) as Root
  if (clone !== root) {
    traverse(
      clone,
      (value, key, parent: any, context) => {
        if (value && typeof value === 'object') {
          parent[key] = cloneDeep(value, mapper, context, ownKeys)
          context.skip(value)
        }
      },
      outerContext,
      ownKeys,
    )
  }
  return clone
}
