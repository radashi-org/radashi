import * as _ from 'radashi'
import { bench } from 'vitest'

describe('lerp', () => {
  bench('with valid input', () => {
    _.lerp(0, 10, 0.5)
  })
})
