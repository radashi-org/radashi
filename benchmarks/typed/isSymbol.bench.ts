import * as _ from 'radashi'

describe('isSymbol', () => {
  bench('with null', () => {
    _.isSymbol(null)
  })

  bench('with empty object', () => {
    _.isSymbol({})
  })

  bench('with Symbol instance', () => {
    _.isSymbol(Symbol('hello'))
  })
})
