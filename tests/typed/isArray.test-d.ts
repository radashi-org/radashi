import * as _ from 'radashi'

describe('isArray return type', () => {
  test('value is any', () => {
    const value = {} as any
    if (_.isArray(value)) {
      expectTypeOf(value).toEqualTypeOf<unknown[]>()
    } else {
      expectTypeOf(value).toEqualTypeOf<any>()
    }
  })
  test('value is unknown', () => {
    const value = {} as unknown
    if (_.isArray(value)) {
      expectTypeOf(value).toEqualTypeOf<unknown[]>()
    } else {
      expectTypeOf(value).toEqualTypeOf<unknown>()
    }
  })
  test('value is never', () => {
    const value = {} as never
    if (_.isArray(value)) {
      expectTypeOf(value).toEqualTypeOf<never>()
    } else {
      expectTypeOf(value).toEqualTypeOf<never>()
    }
  })
  test('value is string', () => {
    const value = {} as string
    if (_.isArray(value)) {
      expectTypeOf(value).toEqualTypeOf<never>()
    } else {
      expectTypeOf(value).toEqualTypeOf<string>()
    }
  })
  test('value is string or readonly string[]', () => {
    const value = {} as string | readonly string[]
    if (_.isArray(value)) {
      expectTypeOf(value).toEqualTypeOf<readonly string[]>()
    } else {
      expectTypeOf(value).toEqualTypeOf<string>()
    }
  })
  test('value is string, readonly string[], or string[]', () => {
    const value = {} as string | readonly string[] | string[]
    if (_.isArray(value)) {
      expectTypeOf(value).toEqualTypeOf<readonly string[] | string[]>()
    } else {
      expectTypeOf(value).toEqualTypeOf<string>()
    }
  })
  test('value is string or string[]', () => {
    const value = {} as string | string[]
    if (_.isArray(value)) {
      expectTypeOf(value).toEqualTypeOf<string[]>()
    } else {
      expectTypeOf(value).toEqualTypeOf<string>()
    }
  })
  test('value is readonly [number, number] | number', () => {
    const value = {} as readonly [number, number] | number
    if (_.isArray(value)) {
      expectTypeOf(value).toEqualTypeOf<readonly [number, number]>()
    } else {
      expectTypeOf(value).toEqualTypeOf<number>()
    }
  })
})
