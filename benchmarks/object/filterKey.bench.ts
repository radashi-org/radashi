import * as _ from 'radashi'

describe('filterKey', () => {
  bench('with array of keys', () => {
    const obj = { a: 1, b: 2, c: 3 }
    _.filterKey(obj, 'a', ['a', 'b'])
  })

  bench('with filter callback', () => {
    const obj = { a: 1, b: undefined, c: 3 }
    _.filterKey(
      obj,
      'a',
      (value: unknown, key: keyof any) => value !== undefined || key === 'd',
    )
  })

  bench('with class instance', () => {
    class A {
      a = 1
      b() {}
    }
    const a = new A()
    _.filterKey(a, 'a', ['a', 'b'])
  })
})
