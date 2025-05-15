const htmlCharacters = /[&<>"']/g
const replacements: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
}

/**
 * Escape HTML characters in a string.
 *
 * @see https://radashi.js.org/reference/string/escapeHTML
 * @example
 * ```ts
 * escapeHTML('<div>Hello, world!</div>')
 * // => '&lt;div&gt;Hello, world!&lt;/div&gt;'
 * ```
 */
export function escapeHTML(input: string): string {
  return input.replace(htmlCharacters, char => replacements[char])
}
