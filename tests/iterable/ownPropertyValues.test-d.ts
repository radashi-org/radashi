import * as _ from 'radashi'

describe('ownPropertyValues', () => {
  test('basic record', () => {
    const data = {} as Record<string, string | number>
    for (const value of _.ownPropertyValues(data)) {
      expectTypeOf(value).toEqualTypeOf<string | number>()
    }
    // Works the same with Object.values
    for (const value of Object.values(data)) {
      expectTypeOf(value).toEqualTypeOf<string | number>()
    }
  })
  test('multiple index signatures', () => {
    const data = {} as Record<string, string> & Record<number, number>
    for (const value of _.ownPropertyValues(data)) {
      expectTypeOf(value).toEqualTypeOf<string | number>()
    }
    // Works the same with Object.values
    for (const value of Object.values(data)) {
      expectTypeOf(value).toEqualTypeOf<string | number>()
    }
  })
  test('object union', () => {
    const data = {} as Record<string, string> | Record<number, number>
    for (const value of _.ownPropertyValues(data)) {
      expectTypeOf(value).toEqualTypeOf<string | number>()
    }
    // ⚠️ Does not work the same with Object.values
    for (const value of Object.values(data)) {
      expectTypeOf(value).toEqualTypeOf<any>()
    }
  })
  test('symbol properties are ignored', () => {
    const symbolKey = Symbol()
    class Data {
      a = 1;
      [symbolKey] = ''
    }
    const data = new Data()
    for (const value of _.ownPropertyValues(data)) {
      expectTypeOf(value).toEqualTypeOf<number>()
    }
    // ⚠️ Does not work the same with Object.values
    for (const value of Object.values(data)) {
      expectTypeOf(value).toEqualTypeOf<any>()
    }
  })
  test('array-like objects', () => {
    const data: ArrayLike<string> = { length: 0 }
    for (const value of _.ownPropertyValues(data)) {
      // This is more accurate, since the "length" property of
      // ArrayLike is potentially enumerable.
      expectTypeOf(value).toEqualTypeOf<string | number>()
    }
    // ⚠️ Does not work the same with Object.values
    for (const value of Object.values(data)) {
      expectTypeOf(value).toEqualTypeOf<string>()
    }
  })
})
