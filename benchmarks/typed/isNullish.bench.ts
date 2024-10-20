import * as _ from 'radashi';

describe('isNullish', () => {
  bench('with null', () => {
    _.isNullish(null)
  })

  bench('with undefined', () => {
    _.isNullish(undefined)
  })

  bench('with number', () => {
    _.isNullish(0)
  })

  bench('with string', () => {
    _.isNullish('')
  })

  bench('with array', () => {
    _.isNullish([])
  })
})

