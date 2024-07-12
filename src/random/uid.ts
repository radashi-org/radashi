import { iterate, random } from 'radashi'

/**
 * Generate a random string of a given length.
 *
 * @see https://radashi-org.github.io/reference/random/uid
 * @example
 * ```ts
 * uid(8)
 * // => "a3fSDf32"
 * ```
 */
export function uid(length: number, specials = ''): string {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789' + specials
  return iterate(
    length,
    acc => {
      return acc + characters.charAt(random(0, characters.length - 1))
    },
    '',
  )
}
