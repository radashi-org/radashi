import * as _ from 'radashi'

describe('capitalize', () => {
  bench('with valid input', () => {
    _.capitalize('hello world')
  })
})
