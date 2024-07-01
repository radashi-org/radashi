import * as _ from 'radashi'
import { bench } from 'vitest'

describe('toInt', () => {
  bench('with string', () => {
    _.toInt('20')
  })

  bench('with undefined', () => {
    _.toInt(undefined)
  })
})
