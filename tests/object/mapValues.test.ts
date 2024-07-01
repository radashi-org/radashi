import * as _ from 'radashi'

describe('mapValues', () => {
  test('runs all values against mapper function', () => {
    const prefixWith = (prefix: string) => (str: string) => `${prefix}${str}`
    const result = _.mapValues(
      {
        x: 'hi',
        y: 'bye',
      },
      prefixWith('x'),
    )
    expect(result).toEqual({
      x: 'xhi',
      y: 'xbye',
    })
  })
  test('objects with possibly undefined values', () => {
    const result = _.mapValues({ x: 'hi  ', y: undefined }, value => {
      // Importantly, the value is typed as "string | undefined"
      // here, due to how the overloads of mapValues are defined.
      return value?.trim()
    })
    expect(result).toEqual({
      x: 'hi',
      y: undefined,
    })
  })
})
