/**
 * Return true if the given values are deeply equal.
 *
 * To determine equality, `Object.is()` is used first. If it returns
 * false, we do the following special checks:
 * - `Date` and `Date` with the same time
 * - `RegExp` and `RegExp` with the same pattern/flags
 * - arrays with the same length and elements (recursive)
 * - objects with the same keys and values (recursive)
 *
 * You may pass a custom compare function to handle specific cases.
 * Your compare function is called before the final object comparison,
 * after all other checks. It can return `null` to default to the
 * built-in behavior.
 *
 * See the documentation for caveats.
 *
 * @see https://radashi.js.org/reference/typed/isEqual
 * @version 12.1.0
 */
export function isEqual<T>(
  x: T,
  y: T,
  customCompare?: (x: any, y: any) => boolean | null | undefined,
): boolean
export function isEqual(
  x: any,
  y: any,
  customCompare?: (x: any, y: any) => boolean | null | undefined,
): boolean {
  if (Object.is(x, y)) {
    return true
  }
  if (
    !x ||
    !y ||
    typeof x !== 'object' ||
    typeof y !== 'object' ||
    Object.getPrototypeOf(x) !== Object.getPrototypeOf(y)
  ) {
    return false
  }
  switch (x.constructor) {
    case Object:
      break
    // Fast path for arrays
    case Array:
      return (
        x.length === y.length &&
        (x as any[]).every((item, index) => {
          return isEqual(item, y[index])
        })
      )
    case Date:
      return x.getTime() === y.getTime()
    case RegExp:
      return x.toString() === y.toString()
    default: {
      const result = customCompare?.(x, y)
      if (result != null) {
        return result
      }
    }
  }
  const kx = Reflect.ownKeys(x)
  const ky = Reflect.ownKeys(y)
  if (kx.length !== ky.length) {
    return false
  }
  for (const key of kx as (keyof typeof x)[]) {
    if (
      !Object.prototype.hasOwnProperty.call(y, key) ||
      !isEqual(x[key], y[key])
    ) {
      return false
    }
  }
  return true
}
