import * as _ from 'radashi'
import { bench } from 'vitest'

describe('isWeakSet', () => {
  bench('with no arguments', () => {
    _.isWeakSet()
  })
})

