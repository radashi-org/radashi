import * as _ from 'radashi'

describe('isWeakSet', () => {
  bench('with valid input', () => {
    _.isWeakSet(new WeakSet())
  })
  bench('with invalid input', () => {
    _.isWeakSet(new Set())
  })
})
