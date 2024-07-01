import * as _ from 'radashi'
import { bench } from 'vitest'

describe('isObject', () => {
  bench('with null', () => {
    _.isObject(null)
  })

  bench('with object literal', () => {
    _.isObject({})
  })

  bench('with class instance', () => {
    class Data {}
    _.isObject(new Data())
  })
})
