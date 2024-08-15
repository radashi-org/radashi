import * as _ from 'radashi'

describe('draw types', () => {
  test('return type with literal argument', () => {
    expectTypeOf(_.draw([])).toBeNull()
    expectTypeOf(_.draw([1, 2, 3])).toBeNumber()
  })
  test('return type with mutable variable', () => {
    const neverList: never[] = []
    const emptyList: number[] = []
    const filledList = [1, 2, 3]

    expectTypeOf(_.draw(neverList)).toEqualTypeOf<null>()
    expectTypeOf(_.draw(emptyList)).toEqualTypeOf<number | null>()
    expectTypeOf(_.draw(filledList)).toEqualTypeOf<number | null>()
  })
  test('return type with immutable variable', () => {
    const neverList: never[] = [] as const
    const emptyList: number[] = [] as const
    const filledList = [1, 2, 3] as const

    expectTypeOf(_.draw(neverList)).toBeNull()
    // FIXME: Can this be narrowed to `null`?
    expectTypeOf(_.draw(emptyList)).toEqualTypeOf<number | null>()
    expectTypeOf(_.draw(filledList)).toEqualTypeOf<1 | 2 | 3>()
  })
})
