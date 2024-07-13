import * as _ from 'radashi'
import { bench } from 'vitest'

describe('clamp', () => {
  bench('with no arguments', () => {
    _.clamp(100, 0, 10)
    _.clamp(0, 10, 100)
    _.clamp(5, 0, 10)
  })
})
