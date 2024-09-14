/**
 * Formats the given string in pascal case fashion.
 *
 * @see https://radashi.js.org/reference/string/pascal
 * @example
 * ```ts
 * pascal('hello world') // => 'HelloWorld'
 * pascal('va va boom') // => 'VaVaBoom'
 * pascal('helloWorld') // => 'HelloWorld'
 * ```
 * @version 12.1.0
 */
export function pascal(str: string): string {
  if (!str) {
    return ''
  }

  const result = str.replace(
    /(?:[^\w\d]|_|\s)+(\w)([A-Z]+)?/g,
    (_, firstCharacter, capitalizedLetters) => {
      if (capitalizedLetters) {
        return firstCharacter.toUpperCase() + capitalizedLetters.toLowerCase()
      }
      return firstCharacter.toUpperCase()
    },
  )

  return result[0].toUpperCase() + result.substring(1)
}
