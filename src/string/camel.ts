import { capitalize } from 'radashi'

/**
 * Formats the given string in camel case fashion.
 *
 * @see https://radashi.js.org/reference/string/camel
 * @example
 * ```ts
 * camel('hello world') // => 'helloWorld'
 * camel('one two-THREE') // => 'oneTwoThree'
 * camel('helloWorld') // => 'helloWorld'
 * ```
 * @version 12.1.0
 */
export function camel(str: string): string {
  const parts =
    str
      ?.replace(/([A-Z])+/g, capitalize)
      ?.split(/(?=[A-Z])|[\.\-\s_]/)
      .map(x => x.toLowerCase()) ?? []
  if (parts.length === 0) {
    return ''
  }
  if (parts.length === 1) {
    return parts[0]
  }
  return parts.reduce((acc, part) => {
    return `${acc}${part.charAt(0).toUpperCase()}${part.slice(1)}`
  })
}
