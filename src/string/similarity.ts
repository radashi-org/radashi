// cSpell:ignore fabiospampinato

/**
 * Calculate the similarity between two strings using the Levenshtein
 * distance algorithm.
 *
 * One thing to note is that the argument order is unimportant. The
 * algorithm will always return the same result regardless of the
 * order of the arguments.
 *
 * Adapted from
 * [@fabiospampinato/tiny-levenshtein](https://github.com/fabiospampinato/tiny-levenshtein)
 * with ❤️.
 *
 * @see https://radashi.js.org/reference/string/similarity
 * @example
 * ```ts
 * similarity('abc', 'abc') // 0
 * similarity('a', 'b') // 1
 * similarity('ab', 'ac') // 1
 * similarity('ac', 'bc') // 1
 * similarity('abc', 'axc') // 1
 * similarity('kitten', 'sitting') // 3
 * ```
 * @version 12.2.0
 */
export function similarity(str1: string, str2: string): number {
  // Early return if strings are identical
  if (str1 === str2) {
    return 0
  }

  // Find common prefix and suffix
  let start = 0
  let end1 = str1.length - 1
  let end2 = str2.length - 1

  while (start <= end1 && start <= end2 && str1[start] === str2[start]) {
    start++
  }

  while (end1 >= start && end2 >= start && str1[end1] === str2[end2]) {
    end1--
    end2--
  }

  // Calculate lengths of trimmed strings
  const length1 = end1 - start + 1
  const length2 = end2 - start + 1

  // Handle cases where one string is a substring of the other
  if (length1 === 0) {
    return length2
  }
  if (length2 === 0) {
    return length1
  }

  const numRows = length1 + 1
  const numColumns = length2 + 1

  const distances = new Array<number>(numRows * numColumns).fill(0)

  for (let x = 1; x < numColumns; x++) {
    distances[x] = x
  }
  for (let y = 1; y < numRows; y++) {
    distances[y * numColumns] = y
  }

  for (let x = 1; x < numColumns; x++) {
    for (let y = 1; y < numRows; y++) {
      const i = y * numColumns + x
      distances[i] = Math.min(
        // Cost of a deletion.
        distances[i - numColumns] + 1,
        // Cost of an insertion.
        distances[i - 1] + 1,
        // Cost of a substitution.
        distances[i - numColumns - 1] +
          (str1[start + y - 1] === str2[start + x - 1] ? 0 : 1),
      )
    }
  }

  // Return the Levenshtein distance
  return distances[length1 * numColumns + length2]
}
