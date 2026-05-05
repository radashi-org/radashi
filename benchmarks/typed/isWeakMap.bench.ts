import * as _ from 'radashi'

describe('isWeakMap', () => {
  bench('with valid input', () => {
    _.isWeakMap(new WeakMap())
  })
  bench('with invalid input', () => {
    _.isWeakMap(new Map())
  })
})
