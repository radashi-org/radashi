import {capitalize} from 'radashi'

/**
 * Formats the given string in dash case fashion.
 *
 * @see https://radashi.js.org/reference/string/dash
 * @example
 * ```ts
 * dash('hello world') // => 'hello-world'
 * dash('one two_THREE') // => 'one-two-three'
 * dash('helloWord') // => 'hello-word'
 * dash('123hello') // => '123-hello'
 * dash('hello123world') // => 'hello-123-world'
 * dash('hello123') // => 'hello-123'
 * ```
 * @version 12.1.0
 */
export function dash(str: string): string {
  const parts =
    str
      ?.replace(/([A-Z])+/g, capitalize)
      ?.split(/(?=[A-Z])|(\d+)|[\.\-\s_]/)
      .filter(Boolean)
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
