import * as _ from 'radashi'

describe('isRegExp', () => {
  bench('with valid input', () => {
    _.isRegExp(/.+/)
  })
  bench('with invalid input', () => {
    _.isRegExp({})
  })
})
