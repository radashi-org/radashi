import * as _ from 'radashi'

describe('cartesianProduct', () => {
  test('returns an array containing an empty array when given an empty input (n=0)', () => {
    expect(_.cartesianProduct()).toEqual([[]])
  })
  test('returns an empty array when given an empty array (n=1)', () => {
    expect(_.cartesianProduct([])).toEqual([])
  })
  test('returns an empty array when given multiple empty arrays (n>1)', () => {
    expect(_.cartesianProduct([], [], [])).toEqual([])
  })
  test('returns an empty array when one of the arrays in the input is empty (n>1)', () => {
    expect(_.cartesianProduct(['1', '2', '3'], [])).toEqual([])
  })
  test('returns an array of singletons when given a single array (n=1)', () => {
    expect(_.cartesianProduct(['1', '2', '3'])).toEqual([['1'], ['2'], ['3']])
  })
  test('performs a correct Cartesian cartesianProduct for two arrays (n=2)', () => {
    expect(_.cartesianProduct(['red', 'blue'], [1, 2, 3])).toEqual([
      ['red', 1],
      ['red', 2],
      ['red', 3],
      ['blue', 1],
      ['blue', 2],
      ['blue', 3],
    ])
  })
  test('performs a correct Cartesian cartesianProduct for more than two arrays (n>2)', () => {
    expect(
      _.cartesianProduct(['red', 'blue'], [1, 2, 3], [true, false]),
    ).toEqual([
      ['red', 1, true],
      ['red', 1, false],
      ['red', 2, true],
      ['red', 2, false],
      ['red', 3, true],
      ['red', 3, false],
      ['blue', 1, true],
      ['blue', 1, false],
      ['blue', 2, true],
      ['blue', 2, false],
      ['blue', 3, true],
      ['blue', 3, false],
    ])
  })
})
