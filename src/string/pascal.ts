/**
 * Formats the given string in pascal case fashion.
 *
 * @see https://radashi-org.github.io/reference/string/pascal
 * @example
 * ```ts
 * pascal('hello world') // => 'HelloWorld'
 * pascal('va va boom') // => 'VaVaBoom'
 * pascal('helloWorld') // => 'HelloWorld'
 * ```
 */
export function pascal(str: string): string {
  if (!str) return "";

    let result = str.replace(/(?:[^\w\d]|_|\s)+(\w)([A-Z]+)?/g, (_, firstCharacter, capitalizedLetters) => {
      if (capitalizedLetters) return firstCharacter.toUpperCase() + capitalizedLetters.toLowerCase()
      return firstCharacter.toUpperCase()
    }) 

    return result[0].toUpperCase() + result.substring(1)
}
