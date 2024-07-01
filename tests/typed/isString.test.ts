import * as _ from 'radashi'

describe('isString', () => {
  test('returns false for null', () => {
    const result = _.isString(null)
    expect(result).toBeFalsy()
  })
  test('returns false for undefined', () => {
    const result = _.isString(undefined)
    expect(result).toBeFalsy()
  })
  test('returns false for boolean', () => {
    const result = _.isString(false)
    expect(result).toBeFalsy()
  })
  test('returns false for class instance', () => {
    class Data {}
    const result = _.isString(new Data())
    expect(result).toBeFalsy()
  })
  test('returns false for number', () => {
    const result = _.isString(22)
    expect(result).toBeFalsy()
  })
  test('returns false for array', () => {
    const result = _.isString([1, 2, 3])
    expect(result).toBeFalsy()
  })
  test('returns false for object', () => {
    const result = _.isString({})
    expect(result).toBeFalsy()
  })
  test('returns true for string', () => {
    const result = _.isString('abc')
    expect(result).toBeTruthy()
  })
  test('returns true for string class', () => {
    const result = _.isString(String('abc'))
    expect(result).toBeTruthy()
  })
})
