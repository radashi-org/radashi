import * as _ from 'radashi'

/**
 * Create a new array with the items of the given array but in a random order.
 * The randomization is done using the [Fisher-Yates algorithm](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle),
 * which is mathematically proven to be unbiased (i.e. all permutations are equally likely).
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
  /**
   * The array to shuffle.
   */
  array: readonly T[],
  /**
   * You can provide a custom random function to make the shuffle more or less
   * random. The custom random function takes minimum and maximum values and
   * returns a random number between them.
   *
   * @default _.random
   * @example
   *
   * ```ts
   * const array = [1, 2, 3, 4, 5]
   * const customRandom = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
   * _.shuffle(array, customRandom)
   * ```
   */
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
