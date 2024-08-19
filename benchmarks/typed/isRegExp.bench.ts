import * as _ from 'radashi'

describe('isRegExp', () => {
  bench('with valid input', () => {
    _.isRegExp(/.+/)
  })
})
