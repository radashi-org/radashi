import * as _ from 'radashi'
import { bench } from 'vitest'

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
