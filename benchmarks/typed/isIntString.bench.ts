import * as _ from 'radashi'
import { bench } from 'vitest'

describe('isIntString', () => {
  bench('with integer string', () => {
    _.isIntString('0')
  })

  bench('with decimal string', () => {
    _.isIntString('22.0567')
  })

  bench('with non-numeric string', () => {
    _.isIntString('abc')
  })
})
