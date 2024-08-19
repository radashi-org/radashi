import * as _ from 'radashi'

describe('camel', () => {
  bench('with valid input', () => {
    _.camel('hello world')
  })
})
