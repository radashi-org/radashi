import * as _ from 'radashi'
import { expectTypeOf } from 'vitest'

describe('last types', () => {
  test('return type with literal argument', () => {
    expectTypeOf(_.last([])).toBeUndefined()
    expectTypeOf(_.last([1, 2, 3])).toBeNumber()
  })
  test('return type with mutable variable', () => {
    const neverList: never[] = []
    const emptyList: number[] = []
    const filledList = [1, 2, 3]

    expectTypeOf(_.last(neverList)).toEqualTypeOf<undefined>()
    expectTypeOf(_.last(emptyList)).toEqualTypeOf<number | undefined>()
    expectTypeOf(_.last(filledList)).toEqualTypeOf<number | undefined>()
  })
  test('return type with immutable variable', () => {
    const neverList: never[] = [] as const
    const emptyList: number[] = [] as const
    const filledList = [1, 2, 3] as const

    expectTypeOf(_.last(neverList)).toBeUndefined()
    // FIXME: Can this be narrowed to `undefined`?
    expectTypeOf(_.last(emptyList)).toEqualTypeOf<number | undefined>()
    expectTypeOf(_.last(filledList)).toEqualTypeOf<1 | 2 | 3>()
  })
})

describe('last types with default value', () => {
  test('return type with literal argument', () => {
    expectTypeOf(_.last([], false)).toBeBoolean()
    expectTypeOf(_.last([1, 2, 3], false)).toBeNumber()
  })
  test('return type with mutable variable', () => {
    const neverList: never[] = []
    const emptyList: number[] = []
    const filledList = [1, 2, 3]

    expectTypeOf(_.last(neverList, false)).toEqualTypeOf<boolean>()
    expectTypeOf(_.last(emptyList, false)).toEqualTypeOf<number | boolean>()
    expectTypeOf(_.last(filledList, false)).toEqualTypeOf<number | boolean>()
  })
  test('return type with immutable variable', () => {
    const neverList: never[] = [] as const
    const emptyList: number[] = [] as const
    const filledList = [1, 2, 3] as const

    expectTypeOf(_.last(neverList, false)).toBeBoolean()
    // FIXME: Can this be narrowed to `boolean`?
    expectTypeOf(_.last(emptyList, false)).toEqualTypeOf<number | boolean>()
    expectTypeOf(_.last(filledList, false)).toEqualTypeOf<1 | 2 | 3>()
  })
})
