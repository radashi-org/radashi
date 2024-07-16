import * as _ from 'radashi'
import { bench } from 'vitest'

describe('randomFloat', () => {
  bench('with no arguments', () => {
    _.randomFloat(0, 100)
  })
})
