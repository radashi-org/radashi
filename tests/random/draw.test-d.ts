import * as _ from 'radashi'

describe('draw', () => {
  test('variable with mutable array', () => {
    const emptyList: number[] = []
    const filledList = [1, 2, 3]

    expectTypeOf(_.draw(emptyList)).toEqualTypeOf<number | null>()
    expectTypeOf(_.draw(filledList)).toEqualTypeOf<number | null>()
  })

  test('variable with empty array', () => {
    const neverList: never[] = []
    const emptyList = [] as const

    expectTypeOf(_.draw(neverList)).toEqualTypeOf<null>()
    expectTypeOf(_.draw(emptyList)).toEqualTypeOf<null>()
  })

  test('variable with tuple', () => {
    const filledList = [1, 2, 3] as const

    expectTypeOf(_.draw(filledList)).toEqualTypeOf<1 | 2 | 3>()
  })

  test('inlined array', () => {
    expectTypeOf(_.draw([])).toEqualTypeOf<null>()
    expectTypeOf(_.draw([1, 2, 3])).toEqualTypeOf<number>()
    expectTypeOf(_.draw([1, 2, 3] as const)).toEqualTypeOf<1 | 2 | 3>()
  })
})
