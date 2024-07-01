import * as _ from 'radashi'
import { bench } from 'vitest'

describe('trim', () => {
  bench('with valid input', () => {
    _.trim(' hello  ')
  })

  bench('with a specified character', () => {
    _.trim('__hello__', '_')
  })

  bench('with two special characters', () => {
    _.trim('_- hello_- ', '_- ')
  })
})
