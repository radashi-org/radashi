/**
 * Make an object callable. Given an object and a function the
 * returned object will be a function with all the objects properties.
 *
 * @see https://radashi.js.org/reference/curry/callable
 * @example
 * ```ts
 * const car = callable({
 *   wheels: 2
 * }, self => () => {
 *   return 'driving'
 * })
 *
 * car.wheels // => 2
 * car() // => 'driving'
 * ```
 * @version 12.1.0
 */
export function callable<
  TValue,
  TObj extends Record<string | number | symbol, TValue>,
  TFunc extends (...args: any) => any,
>(obj: TObj, fn: (self: TObj) => TFunc): TObj & TFunc {
  return new Proxy(Object.assign(fn.bind(null), obj), {
    get: (target, key: string) => target[key],
    set: (target, key: string, value: any) => {
      ;(target as any)[key] = value
      return true
    },
    apply: (target, _, args) => fn(Object.assign({}, target))(...args),
  }) as unknown as TObj & TFunc
}
