import * as _ from 'radashi'

describe('draw', () => {
  test('variable with mutable array', () => {
    const array = [1, 2, 3]

    expectTypeOf(_.draw(array)).toEqualTypeOf<number | null>()
  })

  test('variable with empty array', () => {
    const emptyArray = [] as never[]
    const emptyTuple = [] as const

    expectTypeOf(_.draw(emptyArray)).toEqualTypeOf<null>()
    expectTypeOf(_.draw(emptyTuple)).toEqualTypeOf<null>()
  })

  test('variable with tuple', () => {
    const tuple = [1, 2, 3] as const

    expectTypeOf(_.draw(tuple)).toEqualTypeOf<1 | 2 | 3>()
  })

  test('inlined array', () => {
    expectTypeOf(_.draw([])).toEqualTypeOf<null>()
    expectTypeOf(_.draw([1, 2, 3])).toEqualTypeOf<1 | 2 | 3>()
  })
})
