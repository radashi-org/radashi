import * as _ from 'radashi'

describe('inRange', () => {
  bench('with non-empty range', () => {
    _.inRange(10, 0, 20)
  })

  bench('with two params', () => {
    _.inRange(1, 2)
  })
})
