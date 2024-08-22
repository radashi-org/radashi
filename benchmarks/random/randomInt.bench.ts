import * as _ from 'radashi'
import { bench } from 'vitest'

describe('randomInt', () => {
  bench('with valid input', () => {
    _.randomInt(0, 100)
  })
})
