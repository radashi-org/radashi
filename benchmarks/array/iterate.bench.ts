import * as _ from 'radashi'

describe('iterate', () => {
  bench('with valid input', () => {
    _.iterate(5, (acc, idx) => acc + idx, 0)
  })
})
