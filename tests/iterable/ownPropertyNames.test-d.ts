import * as _ from 'radashi'

describe('ownPropertyNames', () => {
  test('basic record', () => {
    const data = {} as Record<string | number, string>
    for (const name of _.ownPropertyNames(data)) {
      expectTypeOf(name).toEqualTypeOf<string>()
    }
    // Works the same with Object.keys
    for (const name of Object.keys(data)) {
      expectTypeOf(name).toEqualTypeOf<string>()
    }
  })
  test('multiple index signatures', () => {
    const data = {} as Record<string, string> & Record<number, number>
    for (const name of _.ownPropertyNames(data)) {
      expectTypeOf(name).toEqualTypeOf<string>()
    }
    // Works the same with Object.keys
    for (const name of Object.keys(data)) {
      expectTypeOf(name).toEqualTypeOf<string>()
    }
  })
  test('object union', () => {
    const data = {} as Record<string, string> | Record<number, number>
    for (const name of _.ownPropertyNames(data)) {
      expectTypeOf(name).toEqualTypeOf<string>()
    }
    // Works the same with Object.keys
    for (const name of Object.keys(data)) {
      expectTypeOf(name).toEqualTypeOf<string>()
    }
  })
  test('numeric properties are stringified', () => {
    const data = {} as Record<number, number>
    for (const name of _.ownPropertyNames(data)) {
      expectTypeOf(name).toEqualTypeOf<`${number}`>()
    }
    // ⚠️ Does not work the same with Object.keys
    for (const name of Object.keys(data)) {
      expectTypeOf(name).toEqualTypeOf<string>()
    }
  })
  test('symbol properties are ignored', () => {
    const symbolKey = Symbol()
    class Data {
      a = 1
      b = 2;
      [symbolKey] = ''
    }
    const data = new Data()
    for (const name of _.ownPropertyNames(data)) {
      expectTypeOf(name).toEqualTypeOf<'a' | 'b'>()
    }
    // ⚠️ Does not work the same with Object.keys
    for (const name of Object.keys(data)) {
      expectTypeOf(name).toEqualTypeOf<string>()
    }
  })
  test('array-like objects', () => {
    const data: ArrayLike<string> = { length: 0 }
    for (const name of _.ownPropertyNames(data)) {
      // This is more accurate, since the "length" property of
      // ArrayLike is potentially enumerable.
      expectTypeOf(name).toEqualTypeOf<`${number}` | 'length'>()
    }
    // ⚠️ Does not work the same with Object.keys
    for (const name of Object.keys(data)) {
      expectTypeOf(name).toEqualTypeOf<string>()
    }
  })
})
