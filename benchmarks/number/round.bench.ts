import * as _ from 'radashi'

describe('round', () => {
  bench('to default precision (0 decimal places)', () => {
    _.round(123.456)
  })

  bench('with very small numbers close to zero', () => {
    _.round(0.0000000001, 10)
  })

  bench('with out-of-bounds precision', () => {
    _.round(987.654, 1000)
  })
})
