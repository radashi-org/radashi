import * as _ from 'radashi'

describe('first', () => {
  test('inlined array', () => {
    expectTypeOf(_.first([])).toEqualTypeOf<undefined>()
    expectTypeOf(_.first([1, 2, 3])).toEqualTypeOf<1>()
  })

  test('variable with empty array', () => {
    const emptyArray = [] as never[]

    expectTypeOf(_.first(emptyArray)).toEqualTypeOf<undefined>()
  })

  test('variable with mutable array', () => {
    const array = [1, 2, 3]

    expectTypeOf(_.first(array)).toEqualTypeOf<number | undefined>()
  })

  test('variable with readonly tuple', () => {
    const emptyTuple = [] as const
    const tuple = [1, 2, 3] as const

    expectTypeOf(_.first(emptyTuple)).toEqualTypeOf<undefined>()
    expectTypeOf(_.first(tuple)).toEqualTypeOf<1>()
  })

  test('with default value', () => {
    const emptyArray = [] as never[]
    const emptyTuple = [] as const
    const array = [1, 2, 3]
    const tuple = [1, 2, 3] as const

    expectTypeOf(_.first(emptyArray, false)).toEqualTypeOf<false>()
    expectTypeOf(_.first(emptyTuple, false)).toEqualTypeOf<false>()
    expectTypeOf(_.first(array, false)).toEqualTypeOf<number | false>()
    expectTypeOf(_.first(tuple, false)).toEqualTypeOf<1>()
  })
})
