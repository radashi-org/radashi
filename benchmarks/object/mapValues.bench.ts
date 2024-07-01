import * as _ from 'radashi'
import { bench } from 'vitest'

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
