import * as _ from 'radashi'

describe('isString', () => {
  bench('with null', () => {
    _.isString(null)
  })

  bench('with string', () => {
    _.isString('abc')
  })

  bench('with number', () => {
    _.isString(22)
  })

  bench('with object', () => {
    _.isString({})
  })
})
