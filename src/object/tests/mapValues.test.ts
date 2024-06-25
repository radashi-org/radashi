import * as _ from 'radashi'

describe('mapValues function', () => {
  test('runs all values against mapper function', () => {
    const prefixWith = (prefix: string) => (str: string) => `${prefix}${str}`
    const result = _.mapValues(
      {
        x: 'hi',
        y: 'bye'
      },
      prefixWith('x')
    )
    expect(result).toEqual({
      x: 'xhi',
      y: 'xbye'
    })
  })
})
