import * as _ from 'radashi'

describe('castRecord', () => {
  bench('with object literal', () => {
    _.castRecord({})
  })

  bench('with null', () => {
    _.castRecord(null)
  })
})
