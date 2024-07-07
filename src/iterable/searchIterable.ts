import { toIterable, type ToIterableItem } from 'radashi'

export function searchIterable<T extends object>(
  iterable: T,
  match: (item: ToIterableItem<T>, index: number) => boolean,
): ToIterableItem<T> | undefined {
  let index = 0
  for (const item of toIterable(iterable)) {
    if (match(item, index++)) {
      return item
    }
  }
}
