import * as _ from 'radashi'

describe('cartesianProduct', () => {
  bench('with no arguments', () => {
    _.cartesianProduct()
  })

  bench('with single empty array', () => {
    _.cartesianProduct([])
  })

  bench('with one non-empty array (n=1)', () => {
    _.cartesianProduct(['a', 'b', 'c'])
  })

  bench('with two small arrays (n=2)', () => {
    _.cartesianProduct(['red', 'blue'], ['fast', 'slow'])
  })

  bench('with three small arrays (n=3)', () => {
    _.cartesianProduct(['red', 'blue'], ['fast', 'slow'], ['big', 'small'])
  })
})
