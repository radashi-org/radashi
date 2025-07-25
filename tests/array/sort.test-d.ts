import * as _ from 'radashi'

describe('sort types', () => {
  test('keeps tuple type', () => {
    const list = [{ index: 2 }, { index: 0 }, { index: 1 }] as const

    const result = _.sort(list, i => i.index)

    expectTypeOf(result).toEqualTypeOf<
      [(typeof list)[number], (typeof list)[number], (typeof list)[number]]
    >()
  })
})
