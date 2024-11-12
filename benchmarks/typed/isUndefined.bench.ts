import * as _ from 'radashi'

describe('isUndefined', () => {
  bench('with null', () => {
    _.isUndefined(null)
  })

  bench('with undefined', () => {
    _.isUndefined(undefined)
  })

  bench('with string', () => {
    _.isUndefined('abc')
  })

  bench('with number', () => {
    _.isUndefined(22)
  })

  bench('with object', () => {
    _.isUndefined({})
  })
})
