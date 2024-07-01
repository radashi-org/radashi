import * as _ from 'radashi'
import { bench } from 'vitest'

describe('filterKey', () => {
  bench('with array of keys', () => {
    const obj = { a: 1, b: 2, c: 3 }
    _.filterKey(obj, 'a', ['a', 'b'])
  })

  bench('with filter callback', () => {
    const obj = { a: 1, b: undefined, c: 3 }
    _.filterKey(obj, 'a', (value, key) => value !== undefined || key === 'd')
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
