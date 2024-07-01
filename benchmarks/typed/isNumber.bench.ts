import * as _ from 'radashi'
import { bench } from 'vitest'

describe('isNumber', () => {
  bench('with null', () => {
    _.isNumber(null)
  })

  bench('with integer', () => {
    _.isNumber(22)
  })

  bench('with float', () => {
    _.isNumber(22.0567)
  })

  bench('with non-number', () => {
    _.isNumber('22')
  })
})
