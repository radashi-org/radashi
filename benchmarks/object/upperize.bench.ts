import * as _ from 'radashi'
import { bench } from 'vitest'

describe('upperize', () => {
  bench('with valid input', () => {
    _.upperize({
      'x-api-key': 'value',
      bearer: 'value',
    })
  })
})
