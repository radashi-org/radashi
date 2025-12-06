import * as _ from 'radashi'

describe('isMap', () => {
  bench('with valid input', () => {
    _.isMap(new Map())
  })
  bench('with invalid input', () => {
    _.isMap({})
  })
})
