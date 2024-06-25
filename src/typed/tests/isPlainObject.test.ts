import * as _ from 'radashi'

describe('isPlainObject function', () => {
  test('returns true for object literal', () => {
    const result = _.isPlainObject({})
    expect(result).toBeTruthy()
  })
  test('returns true for Object.create(null)', () => {
    const result = _.isPlainObject(Object.create(null))
    expect(result).toBeTruthy()
  })
  test('returns false for non-plain object', () => {
    expect(_.isPlainObject(new Date())).toBeFalsy()
    expect(_.isPlainObject(Math)).toBeFalsy()
    expect(
      _.isPlainObject(
        (function () {
          return arguments
        })()
      )
    ).toBeFalsy()
  })
  test('returns false for array', () => {
    const result = _.isPlainObject([1, 2, 3])
    expect(result).toBeFalsy()
  })
  test('returns false for null', () => {
    const result = _.isPlainObject(null)
    expect(result).toBeFalsy()
  })
  test('returns false for undefined', () => {
    const result = _.isPlainObject(undefined)
    expect(result).toBeFalsy()
  })
})
