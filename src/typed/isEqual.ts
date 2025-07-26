/**
 * Return true if the given values are equal.
 *
 * To determine equality, `Object.is()` is used first. If it returns
 * false, we do the following special checks:
 * - `Date` and `Date` with the same time
 * - `RegExp` and `RegExp` with the same pattern/flags
 * - object with the same keys and values (recursive)
 *
 * @see https://radashi.js.org/reference/typed/isEqual
 * @example
 * ```ts
 * isEqual(0, 0) // => true
 * isEqual(0, 1) // => false
 * ```
 * @version 12.1.0
 */
export function isEqual<TType>(x: TType, y: TType): boolean {
  if (Object.is(x, y)) {
    return true
  }
  if (x instanceof Date && y instanceof Date) {
    return x.getTime() === y.getTime()
  }
  if (x instanceof RegExp && y instanceof RegExp) {
    return x.toString() === y.toString()
  }
  if (
    typeof x !== 'object' ||
    x === null ||
    typeof y !== 'object' ||
    y === null
  ) {
    return false
  }
  const keysX = Reflect.ownKeys(x as unknown as object) as (keyof typeof x)[]
  const keysY = Reflect.ownKeys(y as unknown as object)
  if (keysX.length !== keysY.length) {
    return false
  }
  for (let i = 0; i < keysX.length; i++) {
    if (!Reflect.has(y as unknown as object, keysX[i])) {
      return false
    }
    if (!isEqual(x[keysX[i]], y[keysX[i]])) {
      return false
    }
  }
  return true
}
