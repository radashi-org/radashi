import * as _ from 'radashi'
import { bench } from 'vitest'

describe('isDate', () => {
  bench('with valid input', () => {
    _.isDate(new Date())
  })

  bench('with invalid input', () => {
    _.isDate(new Date('invalid value'))
  })

  bench('with non-Date value', () => {
    _.isDate(22)
  })
})
