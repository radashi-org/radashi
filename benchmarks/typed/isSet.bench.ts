import * as _ from 'radashi'
import { bench } from 'vitest'

describe('isSet', () => {
  bench('with no arguments', () => {
    _.isSet()
  })
})

