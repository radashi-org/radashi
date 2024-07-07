import { toIterable, type ToIterableItem } from 'radashi'

export function reduceIterable<T extends object, Acc>(
  iterable: T,
  reducer: (acc: Acc, value: ToIterableItem<T>, index: number) => Acc,
  initial: Acc,
): Acc {
  let acc = initial
  let index = 0
  for (const value of toIterable(iterable)) {
    acc = reducer(acc, value, index++)
  }
  return acc
}
