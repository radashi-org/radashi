import * as _ from 'radashi'

describe('isNullish return type', () => {
  test('value is any', () => {
    const value = {} as any
    if (_.isNullish(value)) {
      expectTypeOf(value).toEqualTypeOf<null | undefined>()
    } else {
      expectTypeOf(value).toEqualTypeOf<any>()
    }
  })
  test('value is unknown', () => {
    const value = {} as unknown
    if (_.isNullish(value)) {
      expectTypeOf(value).toEqualTypeOf<null | undefined>()
    } else {
      // biome-ignore lint/complexity/noBannedTypes:
      expectTypeOf(value).toEqualTypeOf<{}>()
    }
  })
  test('value is never', () => {
    const value = {} as never
    if (_.isNullish(value)) {
      expectTypeOf(value).toEqualTypeOf<never>()
    } else {
      expectTypeOf(value).toEqualTypeOf<never>()
    }
  })
  test('value is string', () => {
    const value = {} as string
    if (_.isNullish(value)) {
      expectTypeOf(value).toEqualTypeOf<never>()
    } else {
      expectTypeOf(value).toEqualTypeOf<string>()
    }
  })
  test('value is number', () => {
    const value = {} as number
    if (_.isNullish(value)) {
      expectTypeOf(value).toEqualTypeOf<never>()
    } else {
      expectTypeOf(value).toEqualTypeOf<number>()
    }
  })
  test('value is any[]', () => {
    const value = {} as any[]
    if (_.isNullish(value)) {
      expectTypeOf(value).toEqualTypeOf<never>()
    } else {
      expectTypeOf(value).toEqualTypeOf<any[]>()
    }
  })
})
