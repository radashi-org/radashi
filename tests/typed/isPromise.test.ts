import * as _ from 'radashi'

describe('isPromise', () => {
  test('return true for Promise-like values', () => {
    expect(_.isPromise(new Promise(() => {}))).toBeTruthy()
    expect(_.isPromise(Promise.resolve(1))).toBeTruthy()
    expect(_.isPromise(Promise.reject(new Error('nope')))).toBeTruthy()
    expect(_.isPromise((async () => {})())).toBeTruthy()
    // biome-ignore lint/suspicious/noThenProperty:
    expect(_.isPromise({ then: () => {} })).toBeTruthy()
  })
  test('return false for non-Promise-like values', () => {
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
