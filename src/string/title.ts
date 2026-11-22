import { capitalize } from 'radashi'

/**
 * Formats the given string in title case fashion.
 *
 * @see https://radashi.js.org/reference/string/title
 * @example
 * ```ts
 * title('hello world') // => 'Hello World'
 * title('va_va_boom') // => 'Va Va Boom'
 * title('root-hook') // => 'Root Hook'
 * title('queryItems') // => 'Query Items'
 * ```
 * @version 12.1.0
 */
export function title(str: string): string {
  const parts = str.split(/(?=[A-Z])|[\.\-\s_]/)
  let result = ''
  for (const part of parts) {
    const word = part.trim()
    if (word) {
      result += (result ? ' ' : '') + capitalize(word)
    }
  }
  return result
}
