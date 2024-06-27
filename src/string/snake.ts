import { capitalize } from 'radashi'

/**
 * Formats the given string in snake case fashion
 *
 * snake('hello world')   -> 'hello_world' snake('va va-VOOM') ->
 * 'va_va_voom' snake('helloWord') -> 'hello_world'
 */
export function snake(
  str: string,
  options?: {
    splitOnNumber?: boolean
  }
): string {
  const parts =
    str
      ?.replace(/([A-Z])+/g, capitalize)
      .split(/(?=[A-Z])|[\.\-\s_]/)
      .map(x => x.toLowerCase()) ?? []
  if (parts.length === 0) {
    return ''
  }
  if (parts.length === 1) {
    return parts[0]
  }
  const result = parts.reduce((acc, part) => {
    return `${acc}_${part.toLowerCase()}`
  })
  return options?.splitOnNumber === false
    ? result
    : result.replace(/([A-Za-z]{1}[0-9]{1})/, val => `${val[0]!}_${val[1]!}`)
}
