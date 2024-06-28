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

export function getter<T, U = T>(by: Getter<T, U> | undefined): (arg: T) => U {
  return isFunction(by)
    ? by
    : by !== undefined
      ? (arg: T) => arg[by as keyof T] as U
      : (arg: T) => arg as unknown as U
}
