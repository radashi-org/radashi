import * as _ from 'radashi'
import { expectTypeOf } from 'vitest'

describe('draw types', () => {
  test('returns null given empty input', () => {
    const list: unknown[] = []
    const result = _.draw(list)
    expect(result).toBeNull()
  })
  test('return type is null for empty array literal', () => {
    expectTypeOf(_.draw([])).toBeNull()
  })
  test('return type is not null for non-empty array literal', () => {
    expectTypeOf(_.draw([1, 2, 3])).toBeNumber()
  })
  test('return type is possibly null for mutable array variables', () => {
    const emptyList: number[] = []
    const filledList = [1, 2, 3]
    expectTypeOf(_.draw(emptyList)).toEqualTypeOf<number | null>()
    expectTypeOf(_.draw(filledList)).toEqualTypeOf<number | null>()
  })
  test('return type is possibly null for immutable empty array variables', () => {
    const emptyList: number[] = [] as const
    // FIXME: Can be narrowed to `null`
    expectTypeOf(_.draw(emptyList)).toEqualTypeOf<number | null>()
  })
  test('return type is not null for immutable non-empty array variables', () => {
    const filledList = [1, 2, 4] as const
    expectTypeOf(_.draw(filledList)).toBeNumber()
  })
})
