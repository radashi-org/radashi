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
  return str.replace(regex, (_match, ...args) => {
    // Without captures, only the offset and input follow the matched text.
    const key = args.length > 2 ? args[0] : undefined
    return data[key]
  })
}
