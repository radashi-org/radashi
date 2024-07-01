import * as _ from 'radashi'
import { bench } from 'vitest'

describe('lowerize', () => {
  bench('with valid input', () => {
    _.lowerize({
      'X-Api-Key': 'value',
      Bearer: 'value',
    })
  })
})
