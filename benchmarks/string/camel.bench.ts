import * as _ from 'radashi'
import { bench } from 'vitest'

describe('camel', () => {
  bench('with valid input', () => {
    _.camel('hello world')
  })
})
