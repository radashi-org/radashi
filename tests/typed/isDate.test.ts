import * as _ from 'radashi'

describe('isDate', () => {
  test('return true for Date values', () => {
    expect(_.isDate(new Date())).toBeTruthy()
    expect(_.isDate(new Date('2022-09-01T02:19:55.976Z'))).toBeTruthy()
    expect(_.isDate(new Date('invalid value'))).toBeTruthy()
  })
  test('return false for non-Date values', () => {
    expect(_.isDate(22)).toBeFalsy()
    expect(_.isDate({ name: 'x' })).toBeFalsy()
    expect(_.isDate('abc')).toBeFalsy()
    expect(_.isDate(String('abc'))).toBeFalsy()
    expect(_.isDate([1, 2, 3])).toBeFalsy()
    expect(_.isDate(function work() {})).toBeFalsy()
    expect(_.isDate(() => {})).toBeFalsy()
    expect(_.isDate(Symbol(''))).toBeFalsy()
    expect(_.isDate(Symbol('hello'))).toBeFalsy()
  })
})
