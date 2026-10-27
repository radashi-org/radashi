const DEBURR_MAP = new Map<string, string>(
  Object.entries({
    Æ: 'Ae',
    Ð: 'D',
    Ø: 'O',
    Þ: 'Th',
    ß: 'ss',
    æ: 'ae',
    ð: 'd',
    ø: 'o',
    þ: 'th',
    Đ: 'D',
    đ: 'd',
    Ħ: 'H',
    ħ: 'h',
    ı: 'i',
    Ĳ: 'IJ',
    ĳ: 'ij',
    ĸ: 'k',
    Ŀ: 'L',
    ŀ: 'l',
    Ł: 'L',
    ł: 'l',
    ŉ: "'n",
    Ŋ: 'N',
    ŋ: 'n',
    Œ: 'Oe',
    œ: 'oe',
    Ŧ: 'T',
    ŧ: 't',
    ſ: 's',
  }),
)

/**
 * Removes accents and converts extended Latin ligatures to basic Latin text.
 *
 * @see https://radashi.js.org/reference/string/deburr
 * @example
 * ```ts
 * deburr('déjà vu') // => 'deja vu'
 * deburr('Ærøskøbing') // => 'Aeroskobing'
 * ```
 * @version 12.8.0
 */
export function deburr(input: string): string {
  let result = ''
  const chars = input.normalize('NFD')

  for (let index = 0; index < chars.length; index++) {
    const char = chars[index]
    if (
      (char >= '\u0300' && char <= '\u036f') ||
      (char >= '\ufe20' && char <= '\ufe23')
    ) {
      continue
    }

    result += DEBURR_MAP.get(char) ?? char
  }

  return result
}
