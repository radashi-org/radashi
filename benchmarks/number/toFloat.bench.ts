import * as _ from 'radashi'
import { bench } from 'vitest'

describe('toFloat', () => {
  bench('with string', () => {
    _.toFloat('20.00')
  })

  bench('with undefined', () => {
    _.toFloat(undefined)
  })
})
