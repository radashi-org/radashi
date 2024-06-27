/**
 * Replace data by name in template strings. The default expression
 * looks for `{{name}}` to identify names.
 *
 * @example
 * template('Hello, {{name}}', { name: 'Radashi' })
 * // "Hello, Radashi"
 *
 * template('Hello, <name>', { name: 'Radashi' }, /<(.+?)>/g)
 * // "Hello, Radashi"
 */
export function template(
  str: string,
  data: Record<string, any>,
  regex = /\{\{(.+?)\}\}/g
) {
  return Array.from(str.matchAll(regex)).reduce((acc, match) => {
    return acc.replace(match[0], data[match[1]])
  }, str)
}
