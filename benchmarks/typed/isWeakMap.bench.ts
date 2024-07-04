import * as _ from 'radashi'
import { bench } from 'vitest'

describe('isWeakMap', () => {
  bench('with valid input', () => {
    _.isWeakMap(new WeakMap())
  })
})
