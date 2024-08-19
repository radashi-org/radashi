import * as _ from 'radashi'

describe('isWeakSet', () => {
  bench('with valid input', () => {
    _.isWeakSet(new WeakSet())
  })
})
