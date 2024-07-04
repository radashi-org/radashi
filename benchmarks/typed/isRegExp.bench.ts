import * as _ from 'radashi'
import { bench } from 'vitest'

describe('isRegExp', () => {
  bench('with valid input', () => {
    _.isRegExp(/.+/)
  })
})
