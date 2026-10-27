import * as _ from 'radashi'

describe('deburr', () => {
  test('removes accent marks and ligatures from latin text', () => {
    const cases: [string, string][] = [
      ['déjà vu', 'deja vu'],
      ['Crème Brûlée', 'Creme Brulee'],
      ['Straße', 'Strasse'],
      ['Ærøskøbing', 'Aeroskobing'],
      ['Łódź', 'Lodz'],
      ['a\uFE20b', 'ab'],
    ]

    for (const [input, expected] of cases) {
      expect(_.deburr(input)).toBe(expected)
    }
  })
})
