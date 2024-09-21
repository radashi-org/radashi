import { capitalize } from 'radashi'

/**
 * Formats the given string in dash case fashion.
 *
 * @see https://radashi.js.org/reference/string/dash
 * @example
 * ```ts
 * dash('hello world') // => 'hello-world'
 * dash('one two_THREE') // => 'one-two-three'
 * dash('helloWord') // => 'hello-word'
 * ```
 * @version 12.1.0
 */
export function dash(str: string): string {
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
    return `${acc}-${part.toLowerCase()}`
  })
}
