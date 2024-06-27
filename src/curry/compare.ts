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

export type ComparedBy<T> =
  | (T extends object ? ComparableProperty<T> : never)
  | ((arg: T) => Comparable)

export type ComparedValue<T, By extends ComparedBy<T>> = T extends (
  arg: any,
) => infer Result
  ? Result
  : T[By & keyof T]

export function compare<
  PropertyKey extends keyof any,
  Value extends Comparable = Comparable,
>(
  property: PropertyKey,
  compare?: (a: Value, b: Value) => number,
): (
  a: { [P in PropertyKey]: Value },
  b: { [P in PropertyKey]: Value },
) => number

export function compare<T, By extends ComparedBy<T>>(
  by: By,
  compare?: (a: ComparedValue<T, By>, b: ComparedValue<T, By>) => number,
): (a: T, b: T) => number

export function compare(
  by: keyof any | ((obj: any) => any),
  compare?: (a: any, b: any) => number,
) {
  const select = isFunction(by) ? by : (obj: any) => obj[by]
  return (left: any, right: any) => {
    const leftValue = select(left)
    const rightValue = select(right)
    if (compare) {
      return compare(leftValue, rightValue)
    }
    return leftValue > rightValue ? 1 : leftValue < rightValue ? -1 : 0
  }
}
