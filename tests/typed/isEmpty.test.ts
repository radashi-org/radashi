import * as _ from 'radashi'

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
    expect(_.isEmpty(new Date('invalid value'))).toBeTruthy()
  })
  test('returns false for non-empty values', () => {
    expect(_.isEmpty(new Date())).toBeFalsy()
    expect(_.isEmpty(new Date('2022-09-01T02:19:55.976Z'))).toBeFalsy()
    expect(_.isEmpty(22)).toBeFalsy()
    expect(_.isEmpty(-22)).toBeFalsy()
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
  })
})
