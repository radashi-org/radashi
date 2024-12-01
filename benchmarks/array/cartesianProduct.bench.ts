import * as _ from 'radashi'

describe('cartesianProduct', () => {
  bench('with an empty array (n=1)', () => {
    _.cartesianProduct([])
  })

  bench('with a non-empty array (n=1)', () => {
    _.cartesianProduct(['a', 'b', 'c'])
  })

  bench('with two small arrays (n=2)', () => {
    _.cartesianProduct(['red', 'blue'], ['fast', 'slow'])
  })

  bench('with three small arrays (n=3)', () => {
    _.cartesianProduct(['red', 'blue'], ['fast', 'slow'], ['big', 'small'])
  })
})
