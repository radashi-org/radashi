import * as _ from 'radashi'

describe('random', () => {
  bench('with valid input', () => {
    _.random(0, 100)
  })
})
