import * as _ from 'radashi'
import { bench } from 'vitest'

describe('proportionalJitter', () => {
  bench('with base 100 and factor 0.1', () => {
    _.proportionalJitter(100, 0.1)
  })
})
