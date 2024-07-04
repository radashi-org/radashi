import * as _ from 'radashi'
import { bench } from 'vitest'

describe('isWeakSet', () => {
  bench('with valid input', () => {
    _.isWeakSet(new WeakSet())
  })
})
