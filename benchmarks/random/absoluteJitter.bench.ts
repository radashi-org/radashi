import * as _ from 'radashi'
import { bench } from 'vitest'

describe('absoluteJitter', () => {
  bench('with base 100 and offset 5', () => {
    _.absoluteJitter(100, 5)
  })
})
