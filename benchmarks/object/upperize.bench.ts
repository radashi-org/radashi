import * as _ from 'radashi'

describe('upperize', () => {
  bench('with valid input', () => {
    _.upperize({
      'x-api-key': 'value',
      bearer: 'value',
    })
  })
})
