import * as _ from 'radashi'

describe('isEmpty', () => {
  bench('with null', () => {
    _.isEmpty(null)
  })

  bench('with empty object', () => {
    _.isEmpty({})
  })

  bench('with empty string', () => {
    _.isEmpty('')
  })

  bench('with non-empty object', () => {
    _.isEmpty({ name: 'x' })
  })

  bench('with non-empty string', () => {
    _.isEmpty('abc')
  })
})
