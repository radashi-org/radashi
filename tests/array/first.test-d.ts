import * as _ from 'radashi'

describe('first types', () => {
  test('return type with literal argument', () => {
    expectTypeOf(_.first([])).toBeUndefined()
    expectTypeOf(_.first([1, 2, 3])).toBeNumber()
  })
  test('return type with mutable variable', () => {
    const neverList: never[] = []
    const emptyList: number[] = []
    const filledList = [1, 2, 3]

    expectTypeOf(_.first(neverList)).toEqualTypeOf<undefined>()
    expectTypeOf(_.first(emptyList)).toEqualTypeOf<number | undefined>()
    expectTypeOf(_.first(filledList)).toEqualTypeOf<number | undefined>()
  })
  test('return type with immutable variable', () => {
    const neverList: never[] = [] as const
    const emptyList: number[] = [] as const
    const filledList = [1, 2, 3] as const

    expectTypeOf(_.first(neverList)).toBeUndefined()
    // FIXME: Can this be narrowed to `undefined`?
    expectTypeOf(_.first(emptyList)).toEqualTypeOf<number | undefined>()
    expectTypeOf(_.first(filledList)).toEqualTypeOf<1 | 2 | 3>()
  })
})

describe('first types with default value', () => {
  test('return type with literal argument', () => {
    expectTypeOf(_.first([], false)).toBeBoolean()
    expectTypeOf(_.first([1, 2, 3], false)).toBeNumber()
  })
  test('return type with mutable variable', () => {
    const neverList: never[] = []
    const emptyList: number[] = []
    const filledList = [1, 2, 3]

    expectTypeOf(_.first(neverList, false)).toEqualTypeOf<boolean>()
    expectTypeOf(_.first(emptyList, false)).toEqualTypeOf<number | boolean>()
    expectTypeOf(_.first(filledList, false)).toEqualTypeOf<number | boolean>()
  })
  test('return type with immutable variable', () => {
    const neverList: never[] = [] as const
    const emptyList: number[] = [] as const
    const filledList = [1, 2, 3] as const

    expectTypeOf(_.first(neverList, false)).toBeBoolean()
    // FIXME: Can this be narrowed to `boolean`?
    expectTypeOf(_.first(emptyList, false)).toEqualTypeOf<number | boolean>()
    expectTypeOf(_.first(filledList, false)).toEqualTypeOf<1 | 2 | 3>()
  })
})
