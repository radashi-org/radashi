import * as _ from 'radashi'
import { bench } from 'vitest'

describe('castArrayIfExists', () => {
  bench('with an array', () => {
    _.castArrayIfExists(new Array(100))
  })
  bench('with number', () => {
    _.castArrayIfExists(1)
  })
  bench('with null', () => {
    _.castArrayIfExists(null)
  })
})
