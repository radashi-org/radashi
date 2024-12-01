import * as _ from 'radashi'

describe('cartesianProduct return type', () => {
  test('with an empty array', () => {
    const result = _.cartesianProduct([])
    expectTypeOf(result).toEqualTypeOf<[never][]>()
  })
  test('with two arrays', () => {
    const result = _.cartesianProduct(['red', 'blue'], [1, 2])
    const [[v1, v2]] = result
    expectTypeOf(result).toEqualTypeOf<['red' | 'blue', 1 | 2][]>()
    expectTypeOf(v1).toEqualTypeOf<'red' | 'blue'>()
    expectTypeOf(v2).toEqualTypeOf<1 | 2>()
  })
  test('with three arrays', () => {
    const result = _.cartesianProduct(['red', 'blue'], [1, 2], [true, false])
    const [[v1, v2, v3]] = result
    expectTypeOf(result).toEqualTypeOf<['red' | 'blue', 1 | 2, boolean][]>()
    expectTypeOf(v1).toEqualTypeOf<'red' | 'blue'>()
    expectTypeOf(v2).toEqualTypeOf<1 | 2>()
    expectTypeOf(v3).toEqualTypeOf<boolean>()
  })
  test('with readonly arrays', () => {
    const colors = ['red', 'blue'] as const
    const sizes = [1, 2] as const
    const result = _.cartesianProduct(colors, sizes)
    expectTypeOf(result).toEqualTypeOf<
      [(typeof colors)[number], (typeof sizes)[number]][]
    >()
  })
})
