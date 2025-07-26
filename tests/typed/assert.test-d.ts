import * as _ from 'radashi'

describe('assert', () => {
  test('narrow the first argument type', () => {
    const stringOrNull: string | null = 'hello' as any
    _.assert(stringOrNull !== null)
    expectTypeOf(stringOrNull).toEqualTypeOf<string>()

    const numberOrFalsy: number | false | undefined = 1 as any
    _.assert(numberOrFalsy)
    expectTypeOf(numberOrFalsy).toEqualTypeOf<number>()

    const oneOrZero: 1 | 0 = 1 as any
    _.assert(oneOrZero)
    expectTypeOf(oneOrZero).toEqualTypeOf<1>()

    const bool1: boolean = true as any
    const bool2: boolean = false as any
    _.assert(bool1 && bool2)
    expectTypeOf(bool1).toEqualTypeOf<true>()
    expectTypeOf(bool2).toEqualTypeOf<true>()
  })

  test('return type is never for false literal', () => {
    expectTypeOf(_.assert(false)).toBeNever()
  })
})
