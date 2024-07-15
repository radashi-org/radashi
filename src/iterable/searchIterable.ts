import { castIterable, isArray, type CastIterableItem } from 'radashi'

export function searchIterable<T extends object>(
  iterable: T,
  match: (item: CastIterableItem<T>, index: number) => boolean | undefined,
): CastIterableItem<T> | undefined {
  let item: CastIterableItem<T>
  if (isArray(iterable)) {
    // Note: We can't use Array.prototype.find here, because it
    // doesn't respect the sparseness of an array.
    ;(iterable as any[]).some((it, i) => {
      if (match(it, i)) {
        item = it
        return true
      }
    })
  } else {
    let index = 0
    for (item of castIterable(iterable)) {
      if (match(item, index++)) {
        break
      }
    }
  }
  return item!
}
