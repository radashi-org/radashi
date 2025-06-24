import * as _ from 'radashi'

describe('isPromise', () => {
  test('return true for Promise-like values', () => {
    expect(_.isPromiseLike(new Promise(() => {}))).toBeTruthy()
    expect(_.isPromiseLike(Promise.resolve(1))).toBeTruthy()
    expect(_.isPromiseLike((async () => {})())).toBeTruthy()
    // biome-ignore lint/suspicious/noThenProperty:
    expect(_.isPromiseLike({ then: () => {} })).toBeTruthy()
  })
  test('return false for non-Promise-like values', () => {
    expect(_.isPromiseLike(22)).toBeFalsy()
    expect(_.isPromiseLike({ name: 'x' })).toBeFalsy()
    expect(_.isPromiseLike('abc')).toBeFalsy()
    expect(_.isPromiseLike(String('abc'))).toBeFalsy()
    expect(_.isPromiseLike([1, 2, 3])).toBeFalsy()
    expect(_.isPromiseLike(function work() {})).toBeFalsy()
    expect(_.isPromiseLike(() => {})).toBeFalsy()
    expect(_.isPromiseLike(Symbol(''))).toBeFalsy()
    expect(_.isPromiseLike(Symbol('hello'))).toBeFalsy()
    // biome-ignore lint/suspicious/noThenProperty:
    expect(_.isPromiseLike({ then: 2 })).toBeFalsy()
  })
})
