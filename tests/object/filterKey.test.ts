import type { KeyFilter } from 'radashi'
import * as _ from 'radashi'

describe('filterKey', () => {
  test('accepts an array of keys', () => {
    const obj = { a: 1, b: 2, c: 3 }
    const filter: KeyFilter = ['a', 'b']
    for (const key in obj) {
      expect(_.filterKey(obj, key, filter)).toBe(filter.includes(key))
    }
  })
  test('accepts a filter callback', () => {
    const filter: KeyFilter = (value, key) => value !== undefined || key === 'd'
    const obj: any = { a: 1, b: undefined, c: 3 }
    for (const key in obj) {
      expect(_.filterKey(obj, key, filter)).toBe(
        obj[key] !== undefined || key === 'd',
      )
    }
  })
  test('does not match non-enumerable keys', () => {
    const filter: KeyFilter = ['a', 'b']
    class A {
      a = 1
      b() {}
    }
    const a = new A()
    expect(_.filterKey(a, 'a', filter)).toBe(true)
    expect(_.filterKey(a, 'b', filter)).toBe(false)
  })
})
