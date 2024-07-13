import * as _ from 'radashi'

describe('castArray', () => {
  test('mutable arrays', () => {
    const input: number[] = [1, 2, 3]
    expectTypeOf(_.castArray(input)).toEqualTypeOf<number[]>()
  })
  test('readonly arrays', () => {
    const input: readonly number[] = [1, 2, 3]
    const output = _.castArray(input)

    // castArray clones the input array, so "readonly" is removed.
    expectTypeOf(output).toEqualTypeOf<number[]>()
  })
  test('added properties are lost', () => {
    const input = [] as number[] & { foo?: boolean }
    const output = _.castArray(input)

    expectTypeOf(output).toEqualTypeOf<number[]>()
  })
  test('union type with array type and primitive type', () => {
    const input = 1 as number[] | number
    const output = _.castArray(input)

    expectTypeOf(output).toEqualTypeOf<number[]>()
  })
  test('union type with two primitive types', () => {
    const input = 1 as number | string
    const output = _.castArray(input)

    expectTypeOf(output).toEqualTypeOf<(number | string)[]>()
  })
  test('union type with two array types', () => {
    const input = [1, 2, 3] as number[] | readonly string[]
    const output = _.castArray(input)

    expectTypeOf(output).toEqualTypeOf<number[] | string[]>()
  })
  test('primitive types', () => {
    expectTypeOf(_.castArray(1)).toEqualTypeOf<number[]>()
    expectTypeOf(_.castArray('a')).toEqualTypeOf<string[]>()
    expectTypeOf(_.castArray(true)).toEqualTypeOf<boolean[]>()
    expectTypeOf(_.castArray(null)).toEqualTypeOf<null[]>()
    expectTypeOf(_.castArray(undefined)).toEqualTypeOf<undefined[]>()
  })
  test('never type', () => {
    const input = 1 as never
    const output = _.castArray(input)

    expectTypeOf(output).toEqualTypeOf<never[]>()
  })
  test('any type', () => {
    const input = 1 as any
    const output = _.castArray(input)

    expectTypeOf(output).toEqualTypeOf<unknown[]>()
  })
  test('unknown type', () => {
    const input = 1 as unknown
    const output = _.castArray(input)

    expectTypeOf(output).toEqualTypeOf<unknown[]>()
  })
})
