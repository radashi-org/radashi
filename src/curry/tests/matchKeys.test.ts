import * as _ from 'radashi'

describe('matchKeys function', () => {
  const objectEntries = Object.entries as <T extends object>(
    obj: T
  ) => [keyof T, T[keyof T]][]

  test('accepts an array of keys', () => {
    const keys = ['a', 'b']
    const matches = _.matchKeys(keys)
    const obj = {
      a: 1,
      b: 2,
      c: 3
    }
    for (const [key, value] of objectEntries(obj)) {
      expect(matches(value, key, obj)).toBe(keys.includes(key))
    }
  })
  test('accepts a filter callback', () => {
    const matches = _.matchKeys(
      (value, key) => value !== undefined || key === 'd'
    )
    const obj = {
      a: 1,
      b: undefined,
      c: 3,
      d: undefined
    }
    for (const [key, value] of objectEntries(obj)) {
      expect(matches(value, key, obj)).toBe(value !== undefined || key === 'd')
    }
  })
  test('does not match non-enumerable keys', () => {
    const matches = _.matchKeys(['a', 'b'])
    class A {
      a = 1
      b() {}
    }
    const a = new A()
    expect(matches(a.a, 'a', a)).toBe(true)
    expect(matches(a.b, 'b', a)).toBe(false)
  })
  test('accepts an object as 2nd argument', () => {
    const matches = _.matchKeys(['a'], { a: 1, b: 2 })
    expect(matches('a')).toBe(true)
    expect(matches('b')).toBe(false)
  })
})
