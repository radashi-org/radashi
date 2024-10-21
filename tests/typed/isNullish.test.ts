import * as _ from 'radashi'

describe('isNullish', () => {
  test('returns true for null', () => {
    const result = _.isNullish(null)
    expect(result).toBeTruthy()
  })
  test('returns true for undefined', () => {
    const result = _.isNullish(undefined)
    expect(result).toBeTruthy()
  })
  test('returns false for boolean', () => {
    const result = _.isNullish(false)
    expect(result).toBeFalsy()
  })
  test('returns false for number', () => {
    const result = _.isNullish(0)
    expect(result).toBeFalsy()
  })
  test('returns false for NaN', () => {
    const result = _.isNullish(Number.NaN)
    expect(result).toBeFalsy()
  })
  test('returns false for array', () => {
    const result = _.isNullish([])
    expect(result).toBeFalsy()
  })
  test('returns false for object', () => {
    const result = _.isNullish({})
    expect(result).toBeFalsy()
  })
  test('returns false for string', () => {
    const result = _.isNullish('')
    expect(result).toBeFalsy()
  })
})
