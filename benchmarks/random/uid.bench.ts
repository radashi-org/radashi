import * as _ from 'radashi'
import { bench } from 'vitest'

describe('uid', () => {
  bench('with valid input', () => {
    _.uid(10)
  })

  bench('with special characters', () => {
    _.uid(20, '_-+~')
  })
})
