import * as _ from 'radashi'

describe('isSet', () => {
  bench('with valid input', () => {
    _.isSet(new Set())
  })
  bench('with invalid input', () => {
    _.isSet(new Map())
  }
})
