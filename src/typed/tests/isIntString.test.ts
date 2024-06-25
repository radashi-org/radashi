import * as _ from 'radashi'

describe('isIntString function', () => {
  test('returns true for int string', () => {
    expect(_.isIntString('0')).toBeTruthy()
    expect(_.isIntString('22')).toBeTruthy()
    expect(_.isIntString('-22')).toBeTruthy()
    expect(_.isIntString('1e+28')).toBeTruthy()
  })
  test('returns false for decimal string', () => {
    expect(_.isIntString('22.0567')).toBeFalsy()
    expect(_.isIntString('22.0')).toBeFalsy()
  })
  test('returns false for leading + symbol', () => {
    expect(_.isIntString('+22')).toBeFalsy()
  })
  test('returns false for non-numeric string', () => {
    expect(_.isIntString('abc')).toBeFalsy()
    expect(_.isIntString('')).toBeFalsy()
  })
  test('returns false for non-string values', () => {
    expect(_.isIntString(22)).toBeFalsy()
    expect(_.isIntString(true)).toBeFalsy()
    expect(_.isIntString(null)).toBeFalsy()
    expect(_.isIntString(NaN)).toBeFalsy()
  })
})
