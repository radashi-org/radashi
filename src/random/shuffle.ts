import * as _ from 'radashi'

/**
 * Clone an array and shuffle its items randomly.
 *
 * @see https://radashi.js.org/reference/random/shuffle
 * @example
 * ```ts
 * const numbers = [1, 2, 3, 4, 5]
 * const shuffled = shuffle(numbers)
 * // => [2, 1, 4, 5, 3]
 * shuffled !== numbers
 * // => true
 * ```
 * @version 12.1.0
 */
export function shuffle<T>(
  array: readonly T[],
  random: (min: number, max: number) => number = _.random,
): T[] {
  const newArray = array.slice()
  for (let idx = 0, randomIdx: number, item: T; idx < array.length; idx++) {
    randomIdx = random(0, array.length - 1)
    item = newArray[randomIdx]
    newArray[randomIdx] = newArray[idx]
    newArray[idx] = item
  }
  return newArray
}
