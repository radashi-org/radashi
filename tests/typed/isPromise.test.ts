import * as _ from 'radashi'

describe('isPromise function', () => {
  test('return true for Promise values', () => {
    expect(_.isPromise(new Promise(res => res(0)))).toBeTruthy()
    expect(_.isPromise(new Promise(res => res('')))).toBeTruthy()
    expect(_.isPromise((async () => {})())).toBeTruthy()
  })
  test('return false for non-Date values', () => {
    expect(_.isPromise(22)).toBeFalsy()
    expect(_.isPromise({ name: 'x' })).toBeFalsy()
    expect(_.isPromise('abc')).toBeFalsy()
    expect(_.isPromise(String('abc'))).toBeFalsy()
    expect(_.isPromise([1, 2, 3])).toBeFalsy()
    expect(_.isPromise(function work() {})).toBeFalsy()
    expect(_.isPromise(() => {})).toBeFalsy()
    expect(_.isPromise(Symbol(''))).toBeFalsy()
    expect(_.isPromise(Symbol('hello'))).toBeFalsy()
    // biome-ignore lint/suspicious/noThenProperty:
    expect(_.isPromise({ then: 2 })).toBeFalsy()
  })
})
