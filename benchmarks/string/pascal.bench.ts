import * as _ from 'radashi'
import { bench } from 'vitest'

describe('pascal', () => {
  bench('with valid input', () => {
    _.pascal('hello world')
  })
})
