import * as _ from 'radashi'

describe('isWeakMap', () => {
  bench('with valid input', () => {
    _.isWeakMap(new WeakMap())
  })
})
