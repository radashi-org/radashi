import * as _ from 'radashi'

describe('cartesianProduct', () => {
  test('returns an empty array when given an array containing an empty array (n=1)', () => {
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

describe('cartesianProduct types', () => {
  test('with an empty array', () => {
    const result = _.cartesianProduct([])
    expectTypeOf(result).toEqualTypeOf<[never][]>()
  })
  test('with two arrays of the same type', () => {
    const result = _.cartesianProduct(['red', 'blue'], ['fast', 'slow'])
    const [[v1, v2]] = result
    expectTypeOf(result).toEqualTypeOf<[string, string][]>()
    expectTypeOf(v1).toEqualTypeOf<string>()
    expectTypeOf(v2).toEqualTypeOf<string>()
  })
  test('with two arrays of different types', () => {
    const result = _.cartesianProduct(['red', 'blue'], [1, 2])
    const [[v1, v2]] = result
    expectTypeOf(result).toEqualTypeOf<[string, number][]>()
    expectTypeOf(v1).toEqualTypeOf<string>()
    expectTypeOf(v2).toEqualTypeOf<number>()
  })
  test('with three arrays of different types', () => {
    const result = _.cartesianProduct(['red', 'blue'], [1, 2], [true, false])
    const [[v1, v2, v3]] = result
    expectTypeOf(result).toEqualTypeOf<[string, number, boolean][]>()
    expectTypeOf(v1).toEqualTypeOf<string>()
    expectTypeOf(v2).toEqualTypeOf<number>()
    expectTypeOf(v3).toEqualTypeOf<boolean>()
  })
  test('with constant arrays of different types', () => {
    const result = _.cartesianProduct(['red', 'blue'] as const, [1, 2] as const)
    const [[v1, v2]] = result
    expectTypeOf(result).toEqualTypeOf<['red' | 'blue', 1 | 2][]>()
    expectTypeOf(v1).toEqualTypeOf<'red' | 'blue'>()
    expectTypeOf(v2).toEqualTypeOf<1 | 2>()
  })
  test('with a mix of constant and non-constant types', () => {
    const result = _.cartesianProduct(['red', 'blue'], [1, 2] as const)
    const [[v1, v2]] = result
    expectTypeOf(result).toEqualTypeOf<[string, 1 | 2][]>()
    expectTypeOf(v1).toEqualTypeOf<string>()
    expectTypeOf(v2).toEqualTypeOf<1 | 2>()
  })
})
