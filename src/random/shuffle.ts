import * as _ from 'radashi'

export function shuffle<T>(
  array: readonly T[],
  random: (min: number, max: number) => number = _.random,
): T[] {
  const newArray = array.slice()
  for (
    let idx = 0, randomIdx: number, item: T;
    idx < array.length;
    idx++
  ) {
    randomIdx = random(0, array.length - 1)
    item = newArray[randomIdx]
    newArray[randomIdx] = newArray[idx]
    newArray[idx] = item
  }
  return newArray
}
