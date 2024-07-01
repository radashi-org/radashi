import * as _ from 'radashi'
import { bench } from 'vitest'

describe('dash', () => {
  bench('with valid input', () => {
    _.dash('hello world')
  })
})
