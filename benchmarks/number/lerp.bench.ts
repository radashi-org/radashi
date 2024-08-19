import * as _ from 'radashi'

describe('lerp', () => {
  bench('with valid input', () => {
    _.lerp(0, 10, 0.5)
  })
})
