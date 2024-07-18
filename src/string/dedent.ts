import { isArray } from 'radashi'

/**
 * Remove indentation from a string. The given string is expected to
 * be consistently indented (i.e. the leading whitespace of the first
 * non-empty line is the minimum required for all non-empty lines).
 *
 * If the `indent` argument is nullish, the indentation is detected
 * from the first non-empty line. Detection is cheap and robust for
 * most use cases, so you should only set an explicit `indent` if
 * necessary.
 *
 * @see https://radashi-org.github.io/reference/string/dedent
 * @example
 * ```ts
 * // This is indented with 4 spaces.
 * const input = `
 *     Hello
 *     World
 * `
 *
 * // Explicit indentation
 * dedent(input, '  ')
 * // => '  Hello\n  World\n'
 *
 * // Detected indentation
 * dedent(input)
 * // => 'Hello\nWorld\n'
 *
 * // Tagged template strings
 * const str = dedent`
 *   Foo ${1 + 1}
 *   Bar ${2 * 2}
 * `
 * // => 'Foo 2\nBar 4'
 * ```
 */
export function dedent(
  template: TemplateStringsArray,
  ...values: unknown[]
): string

export function dedent(text: string, indent?: string | null): string

export function dedent(
  text: string | TemplateStringsArray,
  ...values: unknown[]
): string {
  // Support tagged template strings
  if (isArray(text)) {
    if (values.length > 0) {
      return dedent(
        text.reduce((acc, input, i) => {
          let value = String(values[i] ?? '')

          // Detect the indentation before this embedded string.
          const indent =
            value.includes('\n') && input.match(/[ \t]*(?=[^\n]*$)/)?.[0]

          // Ensure the multi-line, embedded string can be correctly
          // dedented.
          if (indent) {
            value = value.replace(/\n(?=[^\n]*?\S)/g, '\n' + indent)
          }

          return acc + input + value
        }, ''),
      )
    }

    text = text[0]
  }

  const indent = values[0] ?? detectIndent(text)
  const output = indent
    ? text.replace(new RegExp(`^${indent}`, 'gm'), '')
    : text

  // Remove the first and last lines (if empty).
  return output.replace(/^[ \t]*\n|\n[ \t]*$/g, '')
}

// Find the indentation of the first non-empty line.
function detectIndent(text: string) {
  return text.match(/^[ \t]*(?=\S)/m)?.[0]
}
