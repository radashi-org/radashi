/**
 * Formats the given string in pascal case fashion.
 *
 * @see https://radashi-org.github.io/reference/string/pascal
 * @example
 * ```ts
 * pascal('hello world') // => 'HelloWorld'
 * pascal('va va boom') // => 'VaVaBoom'
 * ```
 */
export function pascal(str: string): string {
  if (!str) return "";

    let a=  str.replace(/(?:[^\w\d]|_|\s)+(\w)([A-Z]+)?/g, (_, a, b) => {
      if (b) return a.toUpperCase() + b.toLowerCase()

      return a.toUpperCase()
    }) 

    return a[0].toUpperCase() + a.slice(1)
}
