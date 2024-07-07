import * as _ from 'radashi'

describe('ownProperties', () => {
  test('basic record', () => {
    const data = {} as Record<string | number, string>
    for (const entry of _.ownProperties(data)) {
      expectTypeOf(entry).toEqualTypeOf<
        [string, string] | [`${number}`, string]
      >()
    }
    // ⚠️ Does not work the same with Object.entries
    for (const entry of Object.entries(data)) {
      expectTypeOf(entry).toEqualTypeOf<[string, string]>()
    }
  })
  test('multiple index signatures', () => {
    const data = {} as Record<string, string> & Record<number, number>
    for (const entry of _.ownProperties(data)) {
      expectTypeOf(entry).toEqualTypeOf<
        [string, string] | [`${number}`, number]
      >()

      // Sadly, this doesn't narrow as of TypeScript 5.5.2
      if (_.isIntString(entry[0])) {
        // This is fine, we can't rule out entry[1] as a string
        expectTypeOf(entry[1]).toEqualTypeOf<number | string>()
      } else {
        // This should be "string" only, but oh well
        expectTypeOf(entry[1]).toEqualTypeOf<number | string>()
      }
    }
    // ⚠️ Does not work the same with Object.entries
    for (const entry of Object.entries(data)) {
      expectTypeOf(entry).toEqualTypeOf<[string, string | number]>()
    }
  })
  test('object union', () => {
    const data = {} as Record<string, string> | Record<number, number>
    for (const entry of _.ownProperties(data)) {
      expectTypeOf(entry).toEqualTypeOf<
        [string, string] | [`${number}`, number]
      >()
    }
    // ⚠️ Does not work the same with Object.entries
    for (const entry of Object.entries(data)) {
      expectTypeOf(entry).toEqualTypeOf<[string, any]>()
    }
  })
  test('string union for keys', () => {
    const data = {} as Record<'a' | 'b', string> & Record<'c', number>
    for (const entry of _.ownProperties(data)) {
      expectTypeOf(entry).toEqualTypeOf<
        ['a', string] | ['b', string] | ['c', number]
      >()

      // Narrowing works with literal keys!
      if (entry[0] === 'c') {
        expectTypeOf(entry[1]).toBeNumber()
      } else {
        expectTypeOf(entry[1]).toBeString()
      }
    }
    // ⚠️ Does not work the same with Object.entries
    for (const entry of Object.entries(data)) {
      expectTypeOf(entry).toEqualTypeOf<[string, string | number]>()
    }
  })
  test('class methods are sadly included', () => {
    class TestClass {
      a = 1
      b() {}
    }
    const data = new TestClass()
    for (const entry of _.ownProperties(data)) {
      // This would preferably only be ['a', number]
      expectTypeOf(entry).toEqualTypeOf<['a', number] | ['b', () => void]>()
    }
    // ⚠️ Does not work the same with Object.entries
    for (const entry of Object.entries(data)) {
      expectTypeOf(entry).toEqualTypeOf<[string, any]>()
    }
  })
  test('array-like objects', () => {
    const data: ArrayLike<string> = { length: 0 }
    for (const entry of _.ownProperties(data)) {
      // This is more accurate, since the "length" property of
      // ArrayLike is potentially enumerable.
      expectTypeOf(entry).toEqualTypeOf<
        [`${number}`, string] | ['length', number]
      >()
    }
    // ⚠️ Does not work the same with Object.entries
    for (const entry of Object.entries(data)) {
      expectTypeOf(entry).toEqualTypeOf<[string, string]>()
    }
  })
})
