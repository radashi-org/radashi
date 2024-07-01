import * as _ from 'radashi'

describe('isArray', () => {
  test('returns false for null', () => {
    const result = _.isArray(null)
    expect(result).toBeFalsy()
  })
  test('returns false for undefined', () => {
    const result = _.isArray(undefined)
    expect(result).toBeFalsy()
  })
  test('returns false for boolean', () => {
    const result = _.isArray(false)
    expect(result).toBeFalsy()
  })
  test('returns false for object', () => {
    const result = _.isArray({})
    expect(result).toBeFalsy()
  })
  test('returns false for class instance', () => {
    class Data {}
    const result = _.isArray(new Data())
    expect(result).toBeFalsy()
  })
  test('returns false for number', () => {
    const result = _.isArray(22)
    expect(result).toBeFalsy()
  })
  test('returns false for string', () => {
    const result = _.isArray('abc')
    expect(result).toBeFalsy()
  })
  test('returns true for array', () => {
    const result = _.isArray([1, 2, 3])
    expect(result).toBeTruthy()
  })
  test('returns true for empty array', () => {
    const result = _.isArray([])
    expect(result).toBeTruthy()
  })
})
