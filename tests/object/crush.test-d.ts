import * as _ from 'radashi'

describe('crush', () => {
  test('direct properties are preserved in the result type', () => {
    const obj = _.crush({ a: 1, b: '2', c: true })
    expectTypeOf(obj).toEqualTypeOf<{ a: number; b: string; c: boolean }>()
  })
  test('nested objects add Record to result type', () => {
    const obj = _.crush({ a: { b: 1 } })
    expectTypeOf(obj).toEqualTypeOf<Record<string, unknown>>()

    const obj2 = _.crush({ a: 1, b: { c: 2 } })
    expectTypeOf(obj2).toEqualTypeOf<{ a: number; [key: string]: unknown }>()
    expectTypeOf(obj2.a).toEqualTypeOf<number>()
    expectTypeOf(obj2['b.c']).toEqualTypeOf<unknown>()
  })
  test('optional property', () => {
    const obj = _.crush({} as { a?: number })
    // FIXME: Try to preserve optionality.
    expectTypeOf(obj).toEqualTypeOf<{ a: number | undefined }>()
  })
  test('crushed Record type', () => {
    const obj = _.crush({} as Record<number, number>)
    expectTypeOf(obj).toEqualTypeOf<Record<number, number>>()

    const obj2 = _.crush({} as Record<string, string>)
    expectTypeOf(obj2).toEqualTypeOf<Record<string, string>>()

    const obj3 = _.crush({} as Record<number, number | object>)
    expectTypeOf(obj3).toEqualTypeOf<Record<string, unknown>>()

    const obj4 = _.crush({} as Record<string, string | unknown[]>)
    expectTypeOf(obj4).toEqualTypeOf<Record<string, unknown>>()
  })
  test('crushed array', () => {
    // We cannot assume the keys from "number[]" input value, but we
    // *can* assume the value type. Note that the value type doesn't
    // contain "undefined" (which matches array behavior).
    const obj = _.crush([1, 2, 3])
    expectTypeOf(obj).toEqualTypeOf<Record<string, number>>()

    const obj2 = _.crush([1, { b: 2 }])
    expectTypeOf(obj2).toEqualTypeOf<Record<string, unknown>>()
    expectTypeOf(obj2[0]).toEqualTypeOf<unknown>()
  })
  test('union type with object and primitive', () => {
    // Since "a" may be an object, we cannot assume the result will
    // have an "a" property. Therefore, the keys and values of the
    // result are unknown.
    const obj = _.crush({ a: {} as number | object })
    expectTypeOf(obj).toEqualTypeOf<Record<string, unknown>>()
  })
})
