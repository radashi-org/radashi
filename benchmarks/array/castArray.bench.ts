import * as _ from 'radashi'

describe('castArray', () => {
  bench('with an array', () => {
    _.castArray(new Array(100))
  })
  bench('with number', () => {
    _.castArray(1)
  })
  bench('with null', () => {
    _.castArray(null)
  })
})
