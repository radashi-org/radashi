import * as _ from 'radashi'

describe('mapValues', () => {
  const prefixWith = (prefix: string) => (str: string) => `${prefix}${str}`

  bench('with valid input', () => {
    _.mapValues(
      {
        x: 'hi',
        y: 'bye',
      },
      prefixWith('x'),
    )
  })
})
