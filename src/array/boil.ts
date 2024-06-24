/**
 * Go through a list of items, starting with the first item, and
 * comparing with the second. Keep the one you want then compare that
 * to the next item in the list with the same
 *
 * Ex. const greatest = () => boil(numbers, (a, b) => a > b)
 */
export const boil = <T>(
  array: readonly T[],
  compareFunc: (a: T, b: T) => T
) => {
  if (!array || (array.length ?? 0) === 0) return null
  return array.reduce(compareFunc)
}
