import * as _ from 'radashi'

describe('isError', () => {
  test('return true for Error values', () => {
    expect(_.isError(new Error())).toBeTruthy()
    expect(_.isError(new TypeError())).toBeTruthy()
    expect(_.isError(new RangeError())).toBeTruthy()
  })
  test('return false for non-Error values', () => {
    expect(_.isError('An error occurred')).toBeFalsy()
    expect(_.isError({ message: 'Error' })).toBeFalsy()
    expect(_.isError(42)).toBeFalsy()
    expect(_.isError(null)).toBeFalsy()
    expect(_.isError(undefined)).toBeFalsy()
    expect(_.isError([])).toBeFalsy()
    expect(_.isError(() => {})).toBeFalsy()
    expect(_.isError(Symbol('error'))).toBeFalsy()
    expect(_.isError(Error)).toBeFalsy()
  })
})
