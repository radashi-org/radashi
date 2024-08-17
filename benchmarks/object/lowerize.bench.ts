import * as _ from 'radashi'

describe('lowerize', () => {
  bench('with valid input', () => {
    _.lowerize({
      'X-Api-Key': 'value',
      Bearer: 'value',
    })
  })
})
