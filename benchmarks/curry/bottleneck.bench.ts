import * as _ from 'radashi'
import { bench } from 'vitest'

describe('bottleneck', () => {
  bench('with no arguments', () => {
    _.bottleneck()
  })
})

