import * as _ from 'radashi'
import { bench } from 'vitest'

describe('isWeakMap', () => {
  bench('with no arguments', () => {
    _.isWeakMap()
  })
})

