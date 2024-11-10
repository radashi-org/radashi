import * as _ from 'radashi'

describe('last', () => {
  test('inlined array', () => {
    expectTypeOf(_.last([])).toEqualTypeOf<undefined>()
    expectTypeOf(_.last([1, 2, 3])).toEqualTypeOf<3>()
  })

  test('variable with empty array', () => {
    const emptyArray = [] as never[]

    expectTypeOf(_.last(emptyArray)).toEqualTypeOf<undefined>()
  })

  test('variable with mutable array', () => {
    const array = [1, 2, 3]

    expectTypeOf(_.last(array)).toEqualTypeOf<number | undefined>()
  })

  test('variable with readonly tuple', () => {
    const emptyTuple = [] as const
    const tuple = [1, 2, 3] as const

    expectTypeOf(_.last(emptyTuple)).toEqualTypeOf<undefined>()
    expectTypeOf(_.last(tuple)).toEqualTypeOf<3>()
  })

  test('with default value', () => {
    const emptyArray = [] as never[]
    const emptyTuple = [] as const
    const array = [1, 2, 3]
    const tuple = [1, 2, 3] as const

    expectTypeOf(_.last(emptyArray, false)).toEqualTypeOf<false>()
    expectTypeOf(_.last(emptyTuple, false)).toEqualTypeOf<false>()
    expectTypeOf(_.last(array, false)).toEqualTypeOf<number | false>()
    expectTypeOf(_.last(tuple, false)).toEqualTypeOf<3>()
  })
})
