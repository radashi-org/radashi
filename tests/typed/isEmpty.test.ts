import * as _ from 'radashi'

function toArgs(array: any) {
  return ((...args: any[]) => args).apply(undefined, array)
}
const args = toArgs([1, 2, 3])

describe('isEmpty', () => {
  class Data {}
  class Person {
    name = 'ray'
  }
  test('returns true for empty values', () => {
    expect(_.isEmpty(null)).toBeTruthy()
    expect(_.isEmpty(undefined)).toBeTruthy()
    expect(_.isEmpty(new Data())).toBeTruthy()
    expect(_.isEmpty(0)).toBeTruthy()
    expect(_.isEmpty(true)).toBeTruthy()
    expect(_.isEmpty([])).toBeTruthy()
    expect(_.isEmpty(false)).toBeTruthy()
    expect(_.isEmpty({})).toBeTruthy()
    expect(_.isEmpty('')).toBeTruthy()
    expect(_.isEmpty(String())).toBeTruthy()
    expect(_.isEmpty(new Map())).toBeTruthy()
    expect(_.isEmpty(new Set())).toBeTruthy()
    expect(_.isEmpty(new Date('invalid value'))).toBeTruthy()
  })
  test('returns false for non-empty values', () => {
    expect(_.isEmpty(new Date())).toBeFalsy()
    expect(_.isEmpty(new Date('2022-09-01T02:19:55.976Z'))).toBeFalsy()
    expect(_.isEmpty(22)).toBeFalsy()
    expect(_.isEmpty(new Person())).toBeFalsy()
    expect(_.isEmpty({ name: 'x' })).toBeFalsy()
    expect(_.isEmpty('abc')).toBeFalsy()
    expect(_.isEmpty(String('abc'))).toBeFalsy()
    expect(_.isEmpty([1, 2, 3])).toBeFalsy()
    expect(_.isEmpty(function work() {})).toBeFalsy()
    expect(_.isEmpty(() => {})).toBeFalsy()
    expect(_.isEmpty(Symbol(''))).toBeFalsy()
    expect(_.isEmpty(Symbol('hello'))).toBeFalsy()
    const map = new Map()
    map.set('a', 1)
    expect(_.isEmpty(map)).toBeFalsy()
    const set = new Set()
    set.add(1)
    expect(_.isEmpty(set)).toBeFalsy()
    expect(_.isEmpty(args)).toBeFalsy()
  })

  it('should work with an object that has a `length` property', () => {
    expect(_.isEmpty({ length: '0' })).toBeFalsy()
    expect(_.isEmpty({ name: 'asfd', length: 0 })).toBeFalsy()
    expect(_.isEmpty({ length: 0 })).toBeFalsy()
  })

  it('should work with prototype objects', () => {
    function Foo() {}
    expect(_.isEmpty(Foo.prototype)).toBeTruthy()
    Foo.prototype = { constructor: Foo }
    expect(_.isEmpty(Foo.prototype)).toBeFalsy()
    Foo.prototype.a = 1
    expect(_.isEmpty(Foo.prototype)).toBeFalsy()
  })

  it('should not treat objects with negative lengths as array-like', () => {
    function Foo() {}
    Foo.prototype.length = -1
    // @ts-ignore
    expect(_.isEmpty(new Foo())).toBeTruthy()
  })

  it('should not treat objects with lengths larger than `MAX_SAFE_INTEGER` as array-like', () => {
    const MAX_SAFE_INTEGER = 9007199254740991
    function Foo() {}
    Foo.prototype.length = MAX_SAFE_INTEGER + 1

    // @ts-ignore
    expect(_.isEmpty(new Foo())).toBeTruthy()
  })
})
