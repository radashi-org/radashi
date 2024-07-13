import * as _ from 'radashi'

describe('castArrayIfExists', () => {
  test('mutable arrays', () => {
    const input: number[] = [1, 2, 3]
    const output = _.castArrayIfExists(input)

    expectTypeOf(output).toEqualTypeOf<number[]>()
  })
  test('readonly arrays', () => {
    const input: readonly number[] = [1, 2, 3]
    const output = _.castArrayIfExists(input)

    // castArrayIfExists clones the input array, so "readonly" is removed.
    expectTypeOf(output).toEqualTypeOf<number[]>()
  })
  test('added properties are lost', () => {
    const input = [] as number[] & { foo?: boolean }
    const output = _.castArrayIfExists(input)

    expectTypeOf(output).toEqualTypeOf<number[]>()
  })
  test('union type with array type and primitive type', () => {
    const input = 1 as number[] | number
    const output = _.castArrayIfExists(input)

    expectTypeOf(output).toEqualTypeOf<number[]>()
  })
  test('union type with two primitive types', () => {
    const input = 1 as number | string
    const output = _.castArrayIfExists(input)

    expectTypeOf(output).toEqualTypeOf<(number | string)[]>()
  })
  test('union type with two array types', () => {
    const input = [1, 2, 3] as number[] | readonly string[]
    const output = _.castArrayIfExists(input)

    expectTypeOf(output).toEqualTypeOf<number[] | string[]>()
  })
  test('primitive types', () => {
    expectTypeOf(_.castArrayIfExists(1)).toEqualTypeOf<number[]>()
    expectTypeOf(_.castArrayIfExists('a')).toEqualTypeOf<string[]>()
    expectTypeOf(_.castArrayIfExists(true)).toEqualTypeOf<boolean[]>()
    expectTypeOf(_.castArrayIfExists(null)).toEqualTypeOf<null>()
    expectTypeOf(_.castArrayIfExists(undefined)).toEqualTypeOf<undefined>()
  })
  test('never type', () => {
    const input = 1 as never
    const output = _.castArrayIfExists(input)

    expectTypeOf(output).toEqualTypeOf<never[]>()
  })
  test('any type', () => {
    const input = 1 as any
    const output = _.castArrayIfExists(input)

    expectTypeOf(output).toEqualTypeOf<unknown[] | null | undefined>()
  })
  test('unknown type', () => {
    const input = 1 as unknown
    const output = _.castArrayIfExists(input)

    expectTypeOf(output).toEqualTypeOf<unknown[] | null | undefined>()
  })
})
