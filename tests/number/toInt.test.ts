import * as _ from 'radashi'

describe('toInt function', () => {
  test('handles null', () => {
    const result = _.toInt(null)
    expect(result).toBe(0)
  })
  test('uses null default', () => {
    const result = _.toInt('x', null)
    expect(result).toBeNull()
  })
  test('handles undefined', () => {
    const result = _.toInt(undefined)
    expect(result).toBe(0)
  })
  test('handles bad input', () => {
    const result = _.toInt({})
    expect(result).toBe(0)
  })
  test('converts 20 correctly', () => {
    const result = _.toInt('20')
    expect(result).toBe(20)
  })
})

describe('isInt function', () => {
  class Data {}
  test('returns false for non-number values', () => {
    expect(_.isInt(undefined)).toBeFalsy()
    expect(_.isInt(null)).toBeFalsy()
    expect(_.isInt(false)).toBeFalsy()
    expect(_.isInt(new Data())).toBeFalsy()
    expect(_.isInt(Number.NaN)).toBeFalsy()
    expect(_.isInt([1, 2, 3])).toBeFalsy()
    expect(_.isInt({})).toBeFalsy()
    expect(_.isInt('abc')).toBeFalsy()
    expect(_.isInt(String('abc'))).toBeFalsy()
  })
  test('returns true for int', () => {
    const result = _.isInt(22)
    expect(result).toBeTruthy()
  })
  test('returns false for float', () => {
    const result = _.isInt(22.0567)
    expect(result).toBeFalsy()
  })
})
