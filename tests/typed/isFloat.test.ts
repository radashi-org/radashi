import * as _ from 'radashi'

describe('isFloat', () => {
  class Data {}
  test('returns false for non-number values', () => {
    expect(_.isFloat(undefined)).toBeFalsy()
    expect(_.isFloat(null)).toBeFalsy()
    expect(_.isFloat(false)).toBeFalsy()
    expect(_.isFloat(new Data())).toBeFalsy()
    expect(_.isFloat(Number.NaN)).toBeFalsy()
    expect(_.isFloat([1, 2, 3])).toBeFalsy()
    expect(_.isFloat({})).toBeFalsy()
    expect(_.isFloat('abc')).toBeFalsy()
    expect(_.isFloat(String('abc'))).toBeFalsy()
  })
  test('returns false for int', () => {
    const result = _.isFloat(22)
    expect(result).toBeFalsy()
  })
  test('returns true for float', () => {
    const result = _.isFloat(22.0567)
    expect(result).toBeTruthy()
  })
})
