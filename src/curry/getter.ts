import { isFunction } from 'radashi'

// Used to detect type `any`
declare const AnyKind: unique symbol
declare class Any {
  private declare any: typeof AnyKind
}

export type CompatibleProperty<T extends object, CompatibleValue> = [
  T,
] extends [Any]
  ? keyof any
  : {
      [P in keyof T]: T[P] extends CompatibleValue ? P : never
    }[keyof T]

export type Getter<T, U = unknown> =
  | ((arg: T) => U)
  | CompatibleProperty<Extract<T, object>, U>

export type Gotten<T, U> = U extends (data: T) => infer Result
  ? Result
  : U extends undefined
    ? T
    : U extends keyof T
      ? T[U]
      : never

/**
 * Coerce the `by` value into a getter function.
 *
 * - If `by` is a function, it is returned as is.
 * - If `by` is a property name, the getter uses it to retrieve the
 *   property value from a given object.
 * - If `by` is undefined, the getter is `(arg: T) => arg`.
 */
export function getter<T, TGetter extends Getter<T>>(
  by: TGetter | undefined,
): (arg: T) => Gotten<T, TGetter> {
  return isFunction(by)
    ? by
    : by !== undefined
      ? (arg: T) => arg[by as keyof T] as any
      : (arg: T) => arg as any
}
