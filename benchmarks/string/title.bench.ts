import * as _ from 'radashi'
import { bench } from 'vitest'

describe('title', () => {
  bench('with valid input', () => {
    _.title('hello world')
  })
})
