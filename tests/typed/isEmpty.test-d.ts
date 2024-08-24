import * as _ from 'radashi'

describe('isEmpty return type', () => {
  test('value is string', () => {
    const value = {} as string

    if (_.isEmpty(value)) {
      expectTypeOf(value).toEqualTypeOf<''>()
    } else {
      expectTypeOf(value).toEqualTypeOf<string>()
    }
  })

  test('value is object', () => {
    type GerenicObject = {
      a: string
      b: number
    }
    const value = {} as GerenicObject

    if (_.isEmpty(value)) {
      expectTypeOf(value).toEqualTypeOf<{
        a: never
        b: never
      }>()
    } else {
      expectTypeOf(value).toEqualTypeOf<GerenicObject>()
    }
  })

  test('value is array', () => {
    const value = [] as string[]

    if (_.isEmpty(value)) {
      expectTypeOf(value).toEqualTypeOf<never[]>()
      const result = value[0]
    } else {
      expectTypeOf(value).toEqualTypeOf<string[]>()
    }
  })

  test('value is number', () => {
    const value = {} as number

    if (_.isEmpty(value)) {
      expectTypeOf(value).toEqualTypeOf<0>()
    } else {
      expectTypeOf(value).toEqualTypeOf<number>()
    }
  })

  test('value is boolean', () => {
    const value = {} as boolean

    if (_.isEmpty(value)) {
      expectTypeOf(value).toEqualTypeOf<false>()
    } else {
      expectTypeOf(value).toEqualTypeOf<true>()
    }
  })

  test('value is null', () => {
    const value = null

    if (_.isEmpty(value)) {
      expectTypeOf(value).toEqualTypeOf<null>()
    } else {
      expectTypeOf(value).toEqualTypeOf<null>()
    }
  })

  test('value is undefined', () => {
    const value = undefined

    if (_.isEmpty(value)) {
      expectTypeOf(value).toEqualTypeOf<undefined>()
    } else {
      expectTypeOf(value).toEqualTypeOf<undefined>()
    }
  })

  test('value is something or undefined', () => {
    const value = {} as string | undefined

    if (_.isEmpty(value)) {
      expectTypeOf(value).toEqualTypeOf<undefined>()
    } else {
      expectTypeOf(value).toEqualTypeOf<string>()
    }
  })

  test('value is something or null', () => {
    const value = {} as string | null

    if (_.isEmpty(value)) {
      expectTypeOf(value).toEqualTypeOf<null>()
    } else {
      expectTypeOf(value).toEqualTypeOf<string>()
    }
  })
})
