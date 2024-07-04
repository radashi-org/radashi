import * as _ from 'radashi'
import { bench } from 'vitest'

describe('isMap', () => {
  bench('with valid input', () => {
    _.isMap(new Map())
  })
})
