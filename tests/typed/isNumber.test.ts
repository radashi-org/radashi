import * as _ from 'radashi'

describe('isNumber', () => {
  test('returns false for null', () => {
    const result = _.isNumber(null)
    expect(result).toBeFalsy()
  })
  test('returns false for undefined', () => {
    const result = _.isNumber(undefined)
    expect(result).toBeFalsy()
  })
  test('returns false for boolean', () => {
    const result = _.isNumber(false)
    expect(result).toBeFalsy()
  })
  test('returns false for class instance', () => {
    class Data {}
    const result = _.isNumber(new Data())
    expect(result).toBeFalsy()
  })
  test('returns true for int', () => {
    const result = _.isNumber(22)
    expect(result).toBeTruthy()
  })
  test('returns true for float', () => {
    const result = _.isNumber(22.0567)
    expect(result).toBeTruthy()
  })
  test('returns true for NaN', () => {
    const result = _.isNumber(Number.NaN)
    expect(result).toBeTruthy()
  })
  test('returns false for array', () => {
    const result = _.isNumber([1, 2, 3])
    expect(result).toBeFalsy()
  })
  test('returns false for object', () => {
    const result = _.isNumber({})
    expect(result).toBeFalsy()
  })
  test('returns false for string', () => {
    const result = _.isNumber('abc')
    expect(result).toBeFalsy()
  })
  test('returns false for string class', () => {
    const result = _.isNumber(String('abc'))
    expect(result).toBeFalsy()
  })
})
