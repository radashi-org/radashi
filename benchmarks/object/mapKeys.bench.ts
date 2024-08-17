import * as _ from 'radashi'

describe('mapKeys', () => {
  const prefixWith = (prefix: string) => (str: string) => `${prefix}${str}`

  bench('with valid input', () => {
    _.mapKeys(
      {
        x: 22,
        y: 8,
      },
      prefixWith('x'),
    )
  })
})
