import * as _ from 'radashi'
import { bench } from 'vitest'

describe('isRegExp', () => {
  bench('with no arguments', () => {
    _.isRegExp()
  })
})

