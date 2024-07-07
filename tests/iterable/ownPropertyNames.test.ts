import * as _ from 'radashi'

describe('ownPropertyNames', () => {
  test('basic functionality', () => {
    const data = { a: 1, b: 2, c: 3 }
    const result = Array.from(_.ownPropertyNames(data))
    expect(result).toEqual(['a', 'b', 'c'])
  })
  test('numeric properties are converted to strings', () => {
    const data = [1, 2, 3]
    const result = Array.from(_.ownPropertyNames(data))
    expect(result).toEqual(['0', '1', '2'])
  })
  test('enumerable properties of prototype are skipped', () => {
    const data = { a: 1, b: 2, __proto__: { c: 3 } }
    const result = Array.from(_.ownPropertyNames(data))
    expect(result).toEqual(['a', 'b'])
  })
  test('non-enumerable properties are skipped', () => {
    const data = { a: 1, b: 2 }
    Object.defineProperty(data, 'c', { value: 3, enumerable: false })
    const result = Array.from(_.ownPropertyNames(data))
    expect(result).toEqual(['a', 'b'])
  })
  test('symbol properties are skipped', () => {
    const symbolKey = Symbol('c')
    const data = { a: 1, b: 2, [symbolKey]: 3 }
    const result = Array.from(_.ownPropertyNames(data))
    expect(result).toEqual(['a', 'b'])
  })
  test('class methods are skipped', () => {
    class TestClass {
      a = 1
      b() {}
    }
    const result = Array.from(_.ownPropertyNames(new TestClass()))
    expect(result).toEqual(['a'])
  })
})
