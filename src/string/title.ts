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
export function title(str: string | null | undefined): string {
  if (!str) {
    return ''
  }
  return str
    .split(/(?=[A-Z])|[\.\-\s_]/)
    .map(s => s.trim())
    .filter(s => !!s)
    .map(s => capitalize(s.toLowerCase()))
    .join(' ')
}
