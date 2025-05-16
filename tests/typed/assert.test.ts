import * as _ from 'radashi'

describe('assert', () => {
  test('does not throw for true condition', () => {
    expect(() => _.assert(true)).not.toThrow()
  })

  test('throws for false condition', () => {
    expect(() => _.assert(false)).toThrowError('Assertion failed')
  })

  test('throws with custom message string', () => {
    expect(() => _.assert(false, 'Custom error message')).toThrowError(
      'Custom error message',
    )
  })

  test('throws with custom error object', () => {
    const customError = new Error('Custom error object')
    expect(() => _.assert(false, customError)).toThrowError(customError)
  })

  test('throws on falsy conditions', () => {
    expect(() => _.assert(0)).toThrowError()
    expect(() => _.assert('')).toThrowError()
    expect(() => _.assert(null)).toThrowError()
  })

  test('return undefined for truthy conditions', () => {
    expect(_.assert(true)).toBeUndefined()
    expect(_.assert(1)).toBeUndefined()
    expect(_.assert({})).toBeUndefined()
    expect(_.assert([])).toBeUndefined()
  })
})
