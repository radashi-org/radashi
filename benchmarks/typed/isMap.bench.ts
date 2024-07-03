import * as _ from 'radashi'
import { bench } from 'vitest'

describe('isMap', () => {
  bench('with no arguments', () => {
    _.isMap()
  })
})

