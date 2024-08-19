import * as _ from 'radashi'

describe('range', () => {
  bench('with default step', () => {
    _.range(0, 4)
  })

  bench('with custom step', () => {
    _.range(0, 6, i => i, 2)
  })

  bench('with custom value generator', () => {
    _.range(0, 3, i => `y${i}`)
  })
})
