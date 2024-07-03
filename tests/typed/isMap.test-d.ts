import * as _ from 'radashi'

describe('isMap return type', () => {
  test('value is any', () => {
    const value = {} as any
    if (_.isMap(value)) {
      expectTypeOf(value).toEqualTypeOf<Map<unknown, unknown>>()
    } else {
      expectTypeOf(value).toEqualTypeOf<any>()
    }
  })
  test('value is unknown', () => {
    const value = {} as unknown
    if (_.isMap(value)) {
      expectTypeOf(value).toEqualTypeOf<Map<unknown, unknown>>()
    } else {
      expectTypeOf(value).toEqualTypeOf<unknown>()
    }
  })
  test('value is string', () => {
    const value = {} as string
    if (_.isMap(value)) {
      expectTypeOf(value).toEqualTypeOf<never>()
    } else {
      expectTypeOf(value).toEqualTypeOf<string>()
    }
  })
  test('value is string or ReadonlyMap', () => {
    const value = {} as string | ReadonlyMap<string, string>
    if (_.isMap(value)) {
      expectTypeOf(value).toEqualTypeOf<ReadonlyMap<string, string>>()
    } else {
      expectTypeOf(value).toEqualTypeOf<string>()
    }
  })
  test('value is string, ReadonlyMap, or Map', () => {
    const value = {} as
      | string
      | ReadonlyMap<string, string>
      | Map<string, string>
    if (_.isMap(value)) {
      expectTypeOf(value).toEqualTypeOf<
        Map<string, string> | ReadonlyMap<string, string>
      >()
    } else {
      expectTypeOf(value).toEqualTypeOf<string>()
    }
  })
  test('value is string or Map', () => {
    const value = {} as string | Map<string, string>
    if (_.isMap(value)) {
      expectTypeOf(value).toEqualTypeOf<Map<string, string>>()
    } else {
      expectTypeOf(value).toEqualTypeOf<string>()
    }
  })
})
