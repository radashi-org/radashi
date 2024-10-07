import * as _ from 'radashi'

describe('cartesianProduct return type', () => {
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
