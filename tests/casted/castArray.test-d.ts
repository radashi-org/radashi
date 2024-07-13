import * as _ from 'radashi'

describe('castArray', () => {
  test('mutable arrays', () => {
    const input: number[] = [1, 2, 3]
    expectTypeOf(_.castArray(input)).toEqualTypeOf<number[]>()
  })
  test('readonly arrays', () => {
    const input: readonly number[] = [1, 2, 3]

    // castArray clones the input array, so "readonly" is removed.
    expectTypeOf(_.castArray(input)).toEqualTypeOf<number[]>()
  })
  test('union type with array type and primitive type', () => {
    const input = 1 as number[] | number
    const output = _.castArray(input)

    expectTypeOf(output).toEqualTypeOf<number[] | [number]>()
  })
  test('union type with two array types', () => {
    const input = [1, 2, 3] as number[] | readonly string[]
    const output = _.castArray(input)

    expectTypeOf(output).toEqualTypeOf<number[] | string[]>()
  })
  test('primitive types', () => {
    expectTypeOf(_.castArray(1)).toEqualTypeOf<[number]>()
    expectTypeOf(_.castArray('a')).toEqualTypeOf<[string]>()
    expectTypeOf(_.castArray(true)).toEqualTypeOf<[true] | [false]>()
    expectTypeOf(_.castArray(null)).toEqualTypeOf<[null]>()
    expectTypeOf(_.castArray(undefined)).toEqualTypeOf<[undefined]>()
  })
})
