/**
 * Replace data by name in template strings. The default expression
 * looks for `{{name}}` to identify names.
 *
 * @see https://radashi.js.org/reference/string/template
 * @example
 * ```ts
 * template('Hello, {{name}}', { name: 'Radashi' })
 * // "Hello, Radashi"
 *
 * template('Hello, <name>', { name: 'Radashi' }, /<(.+?)>/g)
 * // "Hello, Radashi"
 * ```
 * @version 12.1.0
 */
export function template(
  str: string,
  data: Record<string, any>,
  regex: RegExp = /\{\{(.+?)\}\}/g,
): string {
  let result = ''
  let from = 0
  let match: RegExpExecArray | null
  while ((match = regex.exec(str))) {
    result += str.slice(from, match.index) + data[match[1]]
    from = regex.lastIndex
  }
  return result + str.slice(from)
}
