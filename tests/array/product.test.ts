import * as _ from 'radashi'

describe('product', () => {
  test('returns an array containing an empty array when given an empty input array (n=0)', () => {
    expect(_.product([])).toEqual([[]])
  })
  test('returns an empty array when given an array containing an empty array (n=1)', () => {
    expect(_.product([[]])).toEqual([])
  })
  test('returns an empty array when given multiple empty arrays (n>1)', () => {
    expect(_.product([[], [], []])).toEqual([])
  })
  test('returns an empty array when one of the arrays in the input is empty (n>1)', () => {
    expect(_.product([['1', '2', '3'], []])).toEqual([])
  })
  test('returns an array of singletons when given a single array (n=1)', () => {
    expect(_.product([['1', '2', '3']])).toEqual([['1'], ['2'], ['3']])
  })
  test('performs a correct Cartesian product for two arrays (n=2)', () => {
    expect(
      _.product([
        ['red', 'blue'],
        ['fast', 'slow'],
      ]),
    ).toEqual([
      ['red', 'fast'],
      ['red', 'slow'],
      ['blue', 'fast'],
      ['blue', 'slow'],
    ])
  })
  test('performs a correct Cartesian product for more than two arrays (n>2)', () => {
    expect(
      _.product([
        ['red', 'blue'],
        ['fast', 'slow'],
        ['big', 'small'],
      ]),
    ).toEqual([
      ['red', 'fast', 'big'],
      ['red', 'fast', 'small'],
      ['red', 'slow', 'big'],
      ['red', 'slow', 'small'],
      ['blue', 'fast', 'big'],
      ['blue', 'fast', 'small'],
      ['blue', 'slow', 'big'],
      ['blue', 'slow', 'small'],
    ])
  })
})
