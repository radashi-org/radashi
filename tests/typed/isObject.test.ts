import * as _ from 'radashi'

describe('isObject', () => {
  test('returns true for object literal', () => {
    const result = _.isObject({})
    expect(result).toBeTruthy()
  })
  test('returns true for Object.create(null)', () => {
    const result = _.isObject(Object.create(null))
    expect(result).toBeTruthy()
  })
  test('returns true for class instance', () => {
    class Data {}
    const result = _.isObject(new Data())
    expect(result).toBeTruthy()
  })
  test('returns false for null', () => {
    const result = _.isObject(null)
    expect(result).toBeFalsy()
  })
  test('returns false for undefined', () => {
    const result = _.isObject(undefined)
    expect(result).toBeFalsy()
  })
  test('returns false for boolean', () => {
    const result = _.isObject(false)
    expect(result).toBeFalsy()
  })
  test('returns false for number', () => {
    const result = _.isObject(22)
    expect(result).toBeFalsy()
  })
  test('returns false for string', () => {
    const result = _.isObject('abc')
    expect(result).toBeFalsy()
  })
  test('returns false for array', () => {
    const result = _.isObject([1, 2, 3])
    expect(result).toBeFalsy()
  })
})
