import * as _ from 'radashi'

describe('getErrorMessage', () => {
  test('returns the message from an Error', () => {
    const result = _.getErrorMessage(new Error('Request failed'))
    expect(result).toBe('Request failed')
  })

  test('returns the message from an Error subclass', () => {
    const result = _.getErrorMessage(new TypeError('Invalid value'))
    expect(result).toBe('Invalid value')
  })

  test('returns a non-empty string error', () => {
    const result = _.getErrorMessage('Request failed')
    expect(result).toBe('Request failed')
  })

  test('returns a fallback for an Error without a message', () => {
    const result = _.getErrorMessage(new Error())
    expect(result).toBe('Unknown error.')
  })

  test('returns a fallback for an empty string', () => {
    const result = _.getErrorMessage('')
    expect(result).toBe('Unknown error.')
  })

  test('returns a fallback for unsupported values', () => {
    expect(_.getErrorMessage({ message: 'Request failed' })).toBe(
      'Unknown error.',
    )
    expect(_.getErrorMessage(null)).toBe('Unknown error.')
    expect(_.getErrorMessage(undefined)).toBe('Unknown error.')
    expect(_.getErrorMessage(123)).toBe('Unknown error.')
  })
})
