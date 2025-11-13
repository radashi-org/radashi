import * as _ from 'radashi'

describe('isMapEqual', () => {
  test('returns true for equal maps', () => {
    expect(
      _.isMapEqual(
        new Map([
          [1, 'one'],
          [2, 'two'],
          [3, 'three'],
        ]),
        new Map([
          [3, 'three'],
          [2, 'two'],
          [1, 'one'],
        ]),
      ),
    ).toBe(true)
  })

  test('returns false for maps with different keys', () => {
    expect(
      _.isMapEqual(
        new Map([
          ['a', 1],
          ['b', 2],
        ]),
        new Map([
          ['a', 1],
          ['c', 2],
        ]),
      ),
    ).toBe(false)
  })

  test('returns false for maps with different sizes', () => {
    expect(
      _.isMapEqual(
        new Map([['a', 1]]),
        new Map([
          ['a', 1],
          ['b', 2],
        ]),
      ),
    ).toBe(false)
  })

  test('returns false for maps with different values', () => {
    expect(_.isMapEqual(new Map([['a', 1]]), new Map([['a', 2]]))).toBe(false)
  })
})
