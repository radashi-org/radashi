import * as _ from 'radashi'

describe('concat', () => {
  test('preserve non-nullish types', () => {
    const result = _.concat([] as readonly (string | null)[], false, 0)
    expectTypeOf(result).toEqualTypeOf<(string | boolean | number)[]>()
  })

  test('preserve const types', () => {
    const result = _.concat([1, 2, null] as const, 3 as const)
    expectTypeOf(result).toEqualTypeOf<(1 | 2 | 3)[]>()
  })
})
