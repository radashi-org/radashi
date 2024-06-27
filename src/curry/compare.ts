import { isFunction } from 'radashi'

export type Comparable =
  | number
  | string
  | bigint
  | { valueOf: () => number | string | bigint }
  | { [Symbol.toPrimitive](hint: 'number'): number }
  | { [Symbol.toPrimitive](hint: 'string'): string }

export type ComparableProperty<T> = {
  [P in keyof T]: T[P] extends Comparable ? P : never
}[keyof T]

export type ComparedValue<T> =
  | (T extends object ? ComparableProperty<T> : never)
  | ((arg: T) => Comparable)

export function compare<PropertyKey extends keyof any>(
  prop: PropertyKey
): (
  a: { [P in PropertyKey]: Comparable },
  b: { [P in PropertyKey]: Comparable }
) => number

export function compare<T>(prop: ComparedValue<T>): (a: T, b: T) => number

export function compare(arg: keyof any | ((obj: any) => any)) {
  const select = isFunction(arg) ? arg : (obj: any) => obj[arg]
  return (left: any, right: any) => {
    const leftValue = select(left)
    const rightValue = select(right)
    return leftValue > rightValue ? 1 : leftValue < rightValue ? -1 : 0
  }
}
