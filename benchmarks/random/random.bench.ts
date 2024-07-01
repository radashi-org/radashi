import * as _ from 'radashi'
import { bench } from 'vitest'

describe('random', () => {
  bench('with valid input', () => {
    _.random(0, 100)
  })
})
