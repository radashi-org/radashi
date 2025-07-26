import * as _ from 'radashi'

describe('isUndefined', () => {
  test('returns false for null', () => {
    const result = _.isUndefined(null)
    expect(result).toBeFalsy()
  })
  test('returns true for undefined', () => {
    const result = _.isUndefined(undefined)
    expect(result).toBeTruthy()
  })
  test('returns false for boolean', () => {
    const result = _.isUndefined(false)
    expect(result).toBeFalsy()
  })
  test('returns false for class instance', () => {
    class Data {}
    const result = _.isUndefined(new Data())
    expect(result).toBeFalsy()
  })
  test('returns false for number', () => {
    const result = _.isUndefined(22)
    expect(result).toBeFalsy()
  })
  test('returns false for array', () => {
    const result = _.isUndefined([1, 2, 3])
    expect(result).toBeFalsy()
  })
  test('returns false for object', () => {
    const result = _.isUndefined({})
    expect(result).toBeFalsy()
  })
  test('returns false for string', () => {
    const result = _.isUndefined('abc')
    expect(result).toBeFalsy()
  })
})
