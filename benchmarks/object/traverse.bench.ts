import * as _ from 'radashi'
import { bench } from 'vitest'

describe('traverse', () => {
  bench('with no arguments', () => {
    _.traverse()
  })
})

