import * as _ from 'radashi'
import { bench } from 'vitest'

describe('capitalize', () => {
  bench('with valid input', () => {
    _.capitalize('hello world')
  })
})
