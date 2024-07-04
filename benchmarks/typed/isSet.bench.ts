import * as _ from 'radashi'
import { bench } from 'vitest'

describe('isSet', () => {
  bench('with valid input', () => {
    _.isSet(new Set())
  })
})
