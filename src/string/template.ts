/**
 * template is used to replace data by name in template strings. The
 * default expression looks for {{name}} to identify names.
 *
 * Ex. template('Hello, {{name}}', { name: 'ray' }) Ex.
 * template('Hello, <name>', { name: 'ray' }, /<(.+?)>/g)
 */
export const template = (
  str: string,
  data: Record<string, any>,
  regex = /\{\{(.+?)\}\}/g
) => {
  return Array.from(str.matchAll(regex)).reduce((acc, match) => {
    return acc.replace(match[0], data[match[1]])
  }, str)
}
