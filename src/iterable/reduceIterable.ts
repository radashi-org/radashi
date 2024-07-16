import { castIterable, isArray, type CastIterableItem } from 'radashi'

export function reduceIterable<TIterable extends object, TResult>(
  iterable: TIterable,
  reducer: (
    acc: TResult,
    value: CastIterableItem<TIterable>,
    index: number,
  ) => TResult,
  initial: TResult,
): TResult

export function reduceIterable<TIterable extends object, TResult>(
  iterable: TIterable,
  reducer: (
    acc: TResult | undefined,
    value: CastIterableItem<TIterable>,
    index: number,
  ) => TResult,
  initial?: TResult | undefined,
): TResult | undefined

export function reduceIterable<TIterable extends object, TResult>(
  iterable: TIterable,
  reducer: (
    acc: TResult,
    value: CastIterableItem<TIterable>,
    index: number,
  ) => TResult,
  initial?: TResult | undefined,
): TResult | undefined {
  if (!isArray(iterable)) {
    let acc = initial as TResult
    let index = 0
    for (const item of castIterable(iterable)) {
      acc = reducer(acc, item, index++)
    }
    return acc
  }
  return (iterable as any[]).reduce(reducer, initial)
}
