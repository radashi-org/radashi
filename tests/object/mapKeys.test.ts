import * as _ from 'radashi'

describe('mapKeys', () => {
  test('runs all keys against mapper function', () => {
    const prefixWith = (prefix: string) => (str: string) => `${prefix}${str}`
    const result = _.mapKeys(
      {
        x: 22,
        y: 8,
      },
      prefixWith('x'),
    )
    expect(result).toEqual({
      xx: 22,
      xy: 8,
    })
  })
})
