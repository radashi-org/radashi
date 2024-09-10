import * as _ from 'radashi'

describe('product', () => {
  bench('with no arguments', () => {
    _.product([])
  })

  bench('with single empty array', () => {
    _.product([[]])
  })

  bench('with one non-empty array (n=1)', () => {
    _.product([['a', 'b', 'c']])
  })

  bench('with two small arrays (n=2)', () => {
    _.product([
      ['red', 'blue'],
      ['fast', 'slow'],
    ])
  })

  bench('with three small arrays (n=3)', () => {
    _.product([
      ['red', 'blue'],
      ['fast', 'slow'],
      ['big', 'small'],
    ])
  })
})
