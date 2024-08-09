import '../../fluent'

describe('mapValues function', () => {
  test('runs all values against mapper function', () => {
    const prefixWith = (prefix: string) => (str: string) => `${prefix}${str}`
    const result = {
      x: 'hi',
      y: 'bye'
    }.mapValues(prefixWith('x'))
    expect(result).toEqual({
      x: 'xhi',
      y: 'xbye'
    })
  })
})
