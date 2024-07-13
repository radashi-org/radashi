import { type CompatibleProperty, isFunction } from 'radashi'

// Used to detect type `any`
declare const AnyKind: unique symbol
declare class Any {
  private declare any: typeof AnyKind
}

export type Comparable =
  | number
  | string
  | bigint
  | { valueOf: () => number | string | bigint }
  | { [Symbol.toPrimitive](hint: 'number'): number }
  | { [Symbol.toPrimitive](hint: 'string'): string }

export type ComparableProperty<
  T extends object,
  Compared extends Comparable = Comparable,
> = CompatibleProperty<T, Compared>

export type ComparedBy<T, Compared extends Comparable = Comparable> =
  | ComparableProperty<Extract<T, object>, Compared>
  | ((arg: T) => Compared)

export type ComparedValue<T, By extends ComparedBy<T>> = By extends (
  arg: any,
) => infer Result
  ? Result
  : Comparable

export function compare<
  PropertyKey extends keyof any,
  Value extends Comparable = Comparable,
>(
  property: PropertyKey & keyof any,
  compare?: (a: Value, b: Value) => number,
): (
  a: { [P in PropertyKey]: Value },
  b: { [P in PropertyKey]: Value },
) => number

export function compare<T, Compared extends Comparable = Comparable>(
  by: ComparedBy<T, Compared>,
  compare?: (a: Compared, b: Compared) => number,
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
